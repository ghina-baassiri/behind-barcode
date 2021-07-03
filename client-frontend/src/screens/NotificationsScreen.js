import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TouchableHighlight, Animated, StatusBar, Image, FlatList} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {firebaseConfig} from '../utilities/config';
import firebase from 'firebase';
require('firebase/firestore');
import axios from 'axios';
import { windowHeight, windowWidth } from '../utilities/Dimensions';

export default function NotificationsScreen({navigation}) {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); 
  }

  const db = firebase.firestore();

  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState({});
  const { token } = useContext(AuthContext);


  useEffect(() => {
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
        }))
        setMessages(msgs)
      })
    });  
  }, [])


  useEffect(() => {
    messages && fetchAllProducts();
  }, [messages])

  useEffect(() => {
    console.log('/////Products', products);
  }, [products])



  const fetchAllProducts = () => {
    axios.get(`http://192.168.43.152:8000/api/allProducts`, {
      headers: {
        'Authorization': `Bearer ${token}`
    }})
    .then(response => {        
      let items_temp = {};
      for(let i=0; i<response.data.products.length; i++){
        items_temp[response.data.products[i].barcode] = response.data.products[i];
      }
      console.log('After for loop', items_temp);
      setProducts(items_temp);
      return
    })
    .catch(err => {
      console.log('The Error: ', err)      
    })   
  }

 /*const fetchProduct = (barcode) => {
    console.log('fetch')
      axios.get(`http://192.168.43.152:8000/api/product/${barcode}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }})
    .then(response => { 
      if(response.data.product) {
        // setProduct(response.data.product)
      }
    })
    .catch(err => {
      console.log('Fetch Product Error: ', err)      
    })
    return data;   
  }*/
 
  return (
    <View styles={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Notifications
        </Text>
      </View>
      <FlatList
        horizontal={false}
        data={messages}
        keyExtractor={(item) => JSON.stringify(item.createdAt)}
        showsVerticalScrollIndicator={false}              
        contentContainerStyle={{paddingTop:0, marginHorizontal:20,paddingBottom:65}}
        renderItem={({item}) => ((
        <>
          { products &&
            <TouchableOpacity       
              style={styles.Card}    
              onPress={() => { navigation.navigate('ProductStack', {screen: 'ProductMarkets', params: {product: products[item.barcode]}})}}
            >
              <View style={styles.UserInfo}>
                <View style={styles.UserImgWrapper}>
                  <Image
                    style={styles.UserImg} 
                    source={{uri: products[item.barcode].image}} 
                  />
                </View>
                <View style={styles.TextSection}>
                  <View style={styles.UserInfoText}>
                    <Text style={styles.UserName}>{item.title}</Text>
                    <Text style={styles.PostTime}>2:00 PM</Text>
                  </View>
                    <Text style={styles.MessageText}>{item.details}</Text>
                </View>
              </View>
            </TouchableOpacity>
          }
        </>
      ))}/>
    </View>
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
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  Card: {
    width: '100%'
  },
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15
  },
  UserImg: {
    width: 55,
    height: 55,
    borderRadius: 25
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
    fontFamily: 'Lato-Regular'
  },
  PostTime: {
    fontSize: 12,
    color: '#666',
    position:'absolute',
    justifyContent: 'flex-end',
    right:35
  },
  MessageText: {
    fontSize: 14,
    color: '#333333',
    flexWrap: 'wrap',
    width:windowWidth*0.7
  } 
}); 