import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CommonScreenStyles, ListStyles } from '../utilities/Styles';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {firebaseConfig} from '../utilities/config';
import firebase from 'firebase';
require('firebase/firestore');


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
          style={{elevation:5, backgroundColor:'#fff', height:70, width:70, borderRadius:60, justifyContent:'center', alignItems:'center', margin:20, right:0,bottom:0, position:'absolute'}}>
            <MaterialIcons
              name='groups'
              color='#1eb980'
              size={50}
            />
        </TouchableOpacity>
      <View style={CommonScreenStyles.container}>
        {/* {console.log('CHATS ', chats)} */}
        {chats &&
        <FlatList
          bounces={true}
          keyExtractor={item => item.chatRoom}
          data={chats}        
          renderItem={item => {
            console.log('ITEM ',item)
            return (
                <TouchableOpacity    
                  activeOpacity={.9}               
                  style={ ListStyles.itemWrapper }
                  onPress={() => navigation.navigate('Chat', { title: item.item.title, chatRoom: item.item.chatRoom, image: item.item.image})}
                >
                  <Text>{item.item.title}</Text>
                </TouchableOpacity>
                  )}}
                
                showsVerticalScrollIndicator={false}              
                contentContainerStyle={{paddingTop:5,paddingBottom:65}}
                />
            }
      </View>
    </View>

  );
}
