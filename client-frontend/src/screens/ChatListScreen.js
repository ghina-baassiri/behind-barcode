import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar, Image } from 'react-native';
import { CommonScreenStyles, ListStyles } from '../utilities/Styles';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {firebaseConfig} from '../utilities/config';
import firebase from 'firebase';
require('firebase/firestore');
import { windowHeight, windowWidth } from '../utilities/Dimensions';


export default function ChatList({route, navigation}) {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); 
  }

  const [chats, setChats] = useState([]);
  const { user, token } = useContext(AuthContext);

  const db = firebase.firestore();

  useEffect(() => {
      db
      .doc(`subscription/${user._id}`)
      .onSnapshot((doc) => {

        if(doc.exists){
          console.log("Current data: ",  doc.data().productChats);
          console.log('Type test:', doc.data().productChats[0]);
          setChats(doc.data().productChats)
          // doc.data().productChats.forEach(chat=>{
            // getLastMessage(chat.chatRoom)
          // })
        }
      });



    //wholeDB.onsnapshot(=>..... 
    // for(let i of subs) {
      //   db.collection(i.chatRoom).get((doc) => {
      //     getLastMessage(doc);
      //   })
      // }
    // )

  }, [])


  const getLastMessage = (collectionName) => {
    db
      .collection(collectionName)
      .orderBy('createdAt', 'asc')
      .get()
      .then(snapshot => {
        let lastMessage = snapshot.docs[-1].data()
        console.log('last Message', lastMessage)
      })
       
  }

  return (
    <View style={{flex:1}}>
      {/* <Text>Hi</Text> */}
         <TouchableOpacity onPress={() => navigation.navigate('ChatList')} style={{position:'absolute', zIndex:1, top:-40, right:-1}}>      
            <Feather
                name='search'
                size={25}
                color='#fff'
                style={{right:24}}
            />
          </TouchableOpacity>
         <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate('Chat', {title:'Group Chat', chatRoom:'groupChat', image:''})} 
          style={{zIndex:1, elevation:5, backgroundColor:'#fff', height:70, width:70, borderRadius:60, justifyContent:'center', alignItems:'center', margin:20, right:0,bottom:0, position:'absolute'}}>
            <MaterialIcons
              name='groups'
              color='#1eb980'
              size={50}
            />
        </TouchableOpacity>
      <View style={CommonScreenStyles.container}>
        {chats &&
        <FlatList
          keyExtractor={(item) => JSON.stringify(item.createdAt)}
          data={chats}        
          showsVerticalScrollIndicator={false}   
          contentContainerStyle={{paddingTop:0, marginHorizontal:20,paddingBottom:65}}          
          renderItem={item => {
            console.log('ITEM ',item)
            return (
              <TouchableOpacity       
                style={styles.Card}    
                onPress={() => navigation.navigate('Chat', { title: item.item.title, chatRoom: item.item.chatRoom, image: item.item.image})}
              >
            <View style={styles.UserInfo}>

                <View style={styles.UserImgWrapper}>
                    <Image
                        style={styles.UserImg} 
                        source={{uri:  item.item.image}} 
                        />
                </View>

                <View style={styles.TextSection}>
                  <View style={styles.UserInfoText}>
                    <Text style={styles.UserName}>{ item.item.title}</Text>
                    {/* <Text style={styles.PostTime}>2:00 PM</Text> */}
                  </View>
                  {/* <Text style={styles.MessageText}>{item.details}</Text> */}
              </View>
            </View>

            {/* <View style={styles.separator}/> */}


        </TouchableOpacity>
                  )
            }}
            />
            }
      </View>
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
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    
  },
  Card: {
    width: '95%',
    marginBottom:15
  },
  UserInfo: {
    backgroundColor:'#fff',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    elevation:3,
    borderWidth:2,
    borderRadius:10,
    borderColor:'#1eb980'
  },
  separator:{
    height: 2,
    backgroundColor: '#cccccc',
    marginTop:-1
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft:5,
    // paddingRight:10,
  },
  UserImg: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  TextSection: {
    // backgroundColor:'red',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 0,
    marginLeft: 10,
    width: 250,
   
  },
  UserInfoText: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    width:'100%',
    marginBottom: 5
  },
  UserName: {
    fontSize: 18,
    fontWeight: 'bold',
    borderLeftColor:'#ccc',
    borderLeftWidth: 1,
    paddingLeft:10,
    width:220,
    flexWrap: 'wrap',
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