import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TouchableHighlight, Animated, StatusBar, Image, FlatList} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {firebaseConfig} from '../utilities/config';
import firebase from 'firebase';
require('firebase/firestore');
import axios from 'axios';
import { windowWidth, windowHeight } from '../utilities/Dimensions';
import { BadgeContext } from '../navigation/BadgeProvider';
import { ActivityIndicator } from 'react-native-paper';

export default function NotificationsScreen({navigation}) {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); 
  }

  const db = firebase.firestore();

  const [allMessages, setAllMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [products, setProducts] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { user, token } = useContext(AuthContext);
  const { badge, setBadge } = useContext(BadgeContext);
  const isFocused = useIsFocused();
  let badgeCounter
  let items_temp = {};
  let userId = user._id


  useEffect(() => {
    console.log('PRODUCTS ', products)
    db
    .collection('notifications')
    .onSnapshot(collection => {
      db
      .collection('notifications')
      .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
        let msgs = snapshot.docs.map((doc, index) => ({
          barcode: doc.data().barcode,
          createdAt: doc.data().createdAt.toDate(),
          details: doc.data().details,
          title: doc.data().title,
          usersSeen: doc.data().usersSeen
        }))
        setAllMessages(msgs)
      })
    });  
  }, [])


  useEffect(() => {
    let userMsgs = []
    let seen = false
    if(allMessages) {
      for(let j=0; j<allMessages.length; j++) {
        if(!allMessages[j].usersSeen ||(allMessages[j].usersSeen && !allMessages[j].usersSeen.hasOwnProperty(user._id))) {
          userMsgs.push(allMessages[j])
        }
      }
      setUserMessages(userMsgs)
    }
  }, [allMessages])

  
  useEffect(() => {
    // setBadge(count)
    setLoaded(true)
    if(userMessages.length > 0)
      fetchAllProducts();
  }, [userMessages])


  const fetchAllProducts = () => {
    axios.get(`http://192.168.43.152:8000/api/allProducts`, {
      headers: {
        'Authorization': `Bearer ${token}`
    }})
    .then(response => {        
      for(let i=0; i<response.data.products.length; i++){
        items_temp[response.data.products[i].barcode] = response.data.products[i];
      }
      // console.log('After for loop', items_temp);
      setProducts(items_temp);
      
    })
    .catch(err => {
      console.log('The Error: ', err)      
    })   
  }


  const checkDate = (timestamp) => {

    //CreatedAt timestamp
    let date = new Date(timestamp)
    let mm_t = String(date.getMonth() + 1).padStart(2, '0')
    let dd_t = String(date.getDate()).padStart(2, '0')
    let yyyy_t = String(date.getFullYear())
    date = yyyy_t + '-' + mm_t + '-' + dd_t

    // Current Date
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = String(today.getFullYear())
    today = yyyy + '-' + mm + '-' + dd

    // console.log('date ', date)
    // console.log('today ', today)
    // console.log(date === today)
    if(date === today) 
      return true
    return false
  }

  const setNotificationSeen = (brand) => {
    // console.log('function notification seen called')
    db
      .doc(`notifications/${brand}`)
      .get()
      .then((snapshot) => {
        if(snapshot.exists){
          if(snapshot.data().usersSeen){
            let seenBy = snapshot.data().usersSeen
            seenBy[userId] = true
                db
                .doc(`notifications/${brand}`)
                .update({              
                  usersSeen: seenBy
                })
            } else {
              // console.log('Adding new SEENBY ARRAY')
              let idDict = { }
              idDict[userId] = true
              db
                .doc(`notifications/${brand}`)
                .set({
                  usersSeen: idDict
                },{merge:true})
            }
          
        } else {
          console.log('wrong notif naming')
        }        
      })
  }

  const resetStates = () => {
    setLoaded(false)
    setAllMessages([])
    setUserMessages([])
    setProducts({})
  }

  const onImageLoaded = () => {
    console.log('images done loading')
    setLoaded(true)
  }
 
  return (
    <>  
    {!loaded && <ActivityIndicator size='large' color='#1eb980' animating={true} style={{opacity:1, position:'absolute', right:0,left:0,top:0,bottom:0 }}/>}
    <View styles={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Notifications
        </Text>
      </View>
      {Object.keys(products).length === 0 && <View style={{flex:1, alignItems:'center', paddingVertical: windowHeight*0.4}}><Text style={{  color:'#ccc', fontSize:20}}>No Notifications</Text></View>}

      <FlatList
        horizontal={false}
        data={userMessages}
        keyExtractor={(item) => JSON.stringify(item.createdAt)}
        showsVerticalScrollIndicator={false}              
        contentContainerStyle={{paddingTop:0, marginHorizontal:20,paddingBottom:65}}
        renderItem={({item}) => ((
        <>
          { (products && products[item.barcode]) &&
            <TouchableOpacity   
            activeOpacity={1}    
              style={styles.Card}    
              onPress={() => { 
                let newCount = badge - 1
                setBadge(newCount)
                setNotificationSeen(products[item.barcode].brand)
                resetStates()
                navigation.navigate('ProductStack', {screen: 'ProductMarkets', params: {product: products[item.barcode]}})
              }}
            >
              <View style={styles.UserInfo}>
                <View style={styles.UserImgWrapper}>
                  <Image
                    style={styles.UserImg} 
                    source={{uri: products[item.barcode].image}} 
                    // onLoad={onImageLoaded}
                  />
                </View>
                <View style={styles.TextSection}>
                  <View style={styles.UserInfoText}>
                    <Text style={styles.UserName}>{item.title}</Text>
                    <Text style={styles.PostTime}>
                      {
                        !checkDate(item.createdAt) 
                        ? item.createdAt.toLocaleDateString()
                        : item.createdAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})
                      }
                      </Text>
                  </View>
                    <Text style={styles.MessageText}>{item.details}</Text>
                </View>
              </View>
            </TouchableOpacity>
          }
        </>
      ))}/>
    </View>
    </>
  );
}


const styles = StyleSheet.create({
  header: {
    alignItems:'center',
    justifyContent:'center',
    height:85,
    backgroundColor:'#1eb980',
    marginTop:0,
    paddingTop:0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  headerText: {
    fontSize:24,
    color:'#fff'
  },
  Container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  Card: {
    width: '100%',
  },
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'#fff'
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15
  },
  UserImg: {
    width: 60,
    height: 60,
    borderRadius: 40
  },
  TextSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  UserInfoText: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    width:'100%',
    marginBottom: 5
  },
  UserName: {
    fontSize: 16,
    fontWeight: 'bold',
    // fontFamily: 'Lato-Regular'
  },
  PostTime: {
    fontSize: 12,
    color: '#666',
    position:'absolute',
    justifyContent: 'flex-end',
    right:40, 
    top:4
  },
  MessageText: {
    fontSize: 14,
    color: '#333333',
    flexWrap: 'wrap',
    width:windowWidth*0.7
  } 
}); 