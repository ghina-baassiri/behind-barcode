import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Text, View, StyleSheet, StatusBar, LogBox, Image } from 'react-native'
import { BBThemeColor } from '../utilities/Colors'
import { BBDarkGreyColor } from '../utilities/Colors'
import { AuthContext } from '../navigation/AuthProvider'
import { windowHeight, windowWidth } from '../utilities/Dimensions'
import Icon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { firebaseConfig } from '../utilities/config'
import firebase from 'firebase'
require('firebase/firestore')

export default function ChatScreen({ route, navigation }) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app()
  }

  LogBox.ignoreAllLogs()
  const chatRoom = route.params.chatRoom
  const title = route.params.title
  console.log('title', title)
  console.log('room', route.params.chatRoom)
  console.log('image ', route.params.image)

  const [imageUploaded, setImageUploaded] = useState(null)
  const [messages, setMessages] = useState([])
  const [upload, setUpload] = useState(false)
  const { user, token } = useContext(AuthContext)

  const db = firebase.firestore()

  useEffect(() => {
    console.log('USER', user)
    setUpload(false)
    db.collection(route.params.chatRoom).onSnapshot((collection) => {
      db.collection(route.params.chatRoom)
        .orderBy('createdAt', 'desc')
        .get()
        .then((snapshot) => {
          let msgs = snapshot.docs.map((doc, index) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: {
              _id: doc.data().user._id,
              name: doc.data().user.name,
              avatar: doc.data().user.avatar,
            },
          }))
          setMessages(msgs)
        })
    })
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )
    const { _id, createdAt, text, user } = messages[0]
    console.log('user', user)
    console.log('message', messages[0])

    db.collection(route.params.chatRoom).add({
      _id,
      createdAt,
      text,
      user,
    })

    if (route.params.chatRoom !== 'groupChat') {
      db.doc(`subscription/${user._id}`)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            console.log('exists')
            let counter = 0
            let chats = snapshot.data().productChats
            chats.forEach((chat) => {
              if (chat.chatRoom === route.params.chatRoom) counter++
            })
            if (counter === 0) {
              chats.push({
                chatRoom: route.params.chatRoom,
                title: route.params.title,
                image: route.params.image,
              })
              db.doc(`subscription/${user._id}`).set({
                productChats: chats,
              })
            }
          } else {
            console.log('doesnt exist')
            db.doc(`subscription/${user._id}`).set({
              productChats: [
                {
                  chatRoom: route.params.chatRoom,
                  title: route.params.title,
                  image: route.params.image,
                },
              ],
            })
          }
        })
    }
  }, [])

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: BBThemeColor,
          },
          left: {
            backgroundColor: '#fff',
          },
        }}
        textStyle={{
          color: '#fff',
          right: {
            color: '#fff',
          },
        }}
      />
    )
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name='send-circle'
            size={40}
            color={BBThemeColor}
            style={{ marginVertical: 2, marginRight: 12 }}
          />
        </View>
      </Send>
    )
  }

  const scrollToBottomComponent = () => {
    return <Feather name='chevrons-down' size={22} color={BBDarkGreyColor} />
  }

  const renderTicks = (message) => {
    return (
      (message.received || message.sent) && (
        <Icon
          name={message.received ? 'checkmark-done' : 'checkmark'}
          size={16}
          style={{ paddingRight: 5 }}
          color={BBThemeColor}
        />
      )
    )
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          color: '#fff',
          zIndex: 1,
          position: 'absolute',
          top: -43,
          left: 38,
        }}
      >
        {route.params.title}
      </Text>
      <View style={{ zIndex: 1, position: 'absolute' }}>
        {route.params.image ? (
          <Image
            source={{ uri: route.params.image }}
            resizeMode='contain'
            style={{
              width: 45,
              height: 45,
              borderRadius: 500,
              right: -300,
              top: -50,
            }}
          />
        ) : (
          <MaterialIcons
            name='groups'
            color='#fff'
            size={40}
            style={{ right: -300, top: -48 }}
          />
        )}
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: user._id, name: user.name }}
        renderBubble={renderBubble}
        alwaysShowSend
        isTyping
        renderSend={renderSend}
        showAvatarForEveryMessage
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        textInputStyle={{ paddingLeft: 5, paddingRight: 35 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  body: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  footer: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  header: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    backgroundColor: BBThemeColor,
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    color: '#fff',
    fontSize: 22,
  },
  btn: {
    width: '35%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: BBThemeColor,
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  btn_outline: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BBThemeColor,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 11,
    color: '#000',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
})
