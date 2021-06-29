import React, { useState, useEffect, useLayoutEffect, useContext, useCallback } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, LogBox } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight, windowWidth } from '../utilities/Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import {firebaseConfig} from '../utilities/config';
import firebase from 'firebase';
require('firebase/firestore');

export default function ChatScreen({route, navigation}) {
  LogBox.ignoreAllLogs();

  const [messages, setMessages] = useState([]);
  const { user, token } = useContext(AuthContext)

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); 
  }

  const db = firebase.firestore();

  useEffect(() => {
    console.log('USER', user)
    db
    .collection('groupChat')
    .onSnapshot(collection => {
      db
      .collection('groupChat')
      .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
        let msgs = snapshot.docs.map((doc, index) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: {
            _id: doc.data().user._id,
            name: doc.data().user.name,
            avatar: doc.data().user.avatar
          }
        }))
        console.log('msgs-- ', msgs)
        setMessages(msgs)
      })
    });
  
  }, [])


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
      _id,
      createdAt,
      text,
      user,
    } = messages[0]
    console.log('user',user)
    console.log('message',messages[0])


    db
    .collection('groupChat')
    .add({
      _id,
      createdAt,
      text,
      user
    })
  }, [])


  const renderBubble = (props) => {
    return(
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#1eb980'
          },
          left: {
            backgroundColor: '#fff'
          }
        }}
        textStyle={{
          color:'#fff',
          right: {
            color: '#fff'
          }
        }}
      />
  );
}

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons name='send-circle' size={40} color='#1eb980' style={{marginVertical: 2, marginRight: 12}}/>
        </View>
      </Send>
    );
  }

  const scrollToBottomComponent = () => {
    return (
      <Feather
          name='chevrons-down'
          size={22}
          color='#333'
      />
    );
  }

  const renderTicks = (message) => {
    return ( 
      (message.received || message.sent) && 
       <Icon 
        name={message.received ? "checkmark-done" : "checkmark"} 
        size={16} style={{ paddingRight: 5 }} color='#1eb980' /> 
    );
  }

  function renderActions() {
    return (
        <Feather
          style={styles.uploadImage}
          // onPress={uploadImage}
          name='image'
          size={25}
          color='#ccc'
        />
    );
  }


  return (
    <View style={styles.container}>
      {/* <View style={{...styles.header, flexDirection:'row'}}>    
          <TouchableOpacity onPress=c} style={{position:'absolute', left:10}} >
          <MaterialIcons
            name='navigate-before'
            color='#fff'
            size={22}                      
          />
        </TouchableOpacity>        
        <Text style={styles.title}>BB Chat Zone</Text>
      </View> */}
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: user._id, name: user.name, avatar: user.avatar ? user.avatar : 'https://firebasestorage.googleapis.com/v0/b/behind-barcode.appspot.com/o/images%2Fusers%2Fcircular-modern-red-skype-icon-skype-profile-png-512_512.png?alt=media&token=ab37283c-393f-4a1d-88ba-49e953926d95'}}
        renderBubble={renderBubble}
        alwaysShowSend
        isTyping
        // loadEarlier
        // isLoadingEarlier 
        renderSend={renderSend}
        renderActions={renderActions}
        showAvatarForEveryMessage
        // renderTicks={message => renderTicks(message)}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        textInputStyle = {{paddingLeft:5, paddingRight:35, }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 

},
  body: {
      alignItems:'center',
      paddingHorizontal:20,
      paddingVertical:30,
  },
  footer: {
      width: '100%',
      height:110,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:20,
  },
  header: {
      width: '100%',
      height:55,
      justifyContent:'center',
      backgroundColor:'#1eb980',
      alignItems: 'center',
  }, 
  title: {
    justifyContent: 'center',
    color:'#fff',
    fontSize:22,
  },
  btn: {
      width: '35%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginVertical:5,
      backgroundColor:'#1eb980'
  },
  btnText: {
      fontSize: 14,
      fontWeight: 'bold',
      color:'#fff'
  },
  btn_outline: {
      width: '40%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginVertical:10,
      backgroundColor:'#fff',
      borderWidth: 1,
      borderColor: '#1eb980'
  },
  textStyleSmall: {
      textAlign: 'center',
      fontSize: 11,
      color: '#000',
      marginTop: 10,
      textDecorationLine:'underline'
    },
    uploadImage: {
      position: 'absolute',
      right: 55,
      top:10,
      borderRightWidth: 1,
      paddingRight:5,
      borderRightColor:'#e5e5e5'
    }
});