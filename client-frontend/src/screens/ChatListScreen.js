import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native'
import { BBThemeColor } from '../utilities/Colors'
import { BBLightGreyColor } from '../utilities/Colors'
import { BBMediumDarkGreyColor } from '../utilities/Colors'
import { BBDarkGreyColor } from '../utilities/Colors'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { firebaseConfig } from '../utilities/config'
import firebase from 'firebase'
require('firebase/firestore')
import { windowWidth } from '../utilities/Dimensions'

export default function ChatList({ navigation }) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app()
  }

  const [chats, setChats] = useState([])
  const { user, token } = useContext(AuthContext)

  const db = firebase.firestore()

  useEffect(() => {
    db.doc(`subscription/${user._id}`).onSnapshot((doc) => {
      if (doc.exists) {
        console.log('Current data: ', doc.data().productChats)
        console.log('Type test:', doc.data().productChats[0])
        setChats(doc.data().productChats)
      }
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ChatList')}
        style={{ position: 'absolute', zIndex: 1, top: -40, right: -1 }}
      >
        <Feather name='search' size={25} color='#fff' style={{ right: 24 }} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('Chat', {
            title: 'Group Chat',
            chatRoom: 'groupChat',
            image: '',
          })
        }
        style={{
          zIndex: 1,
          elevation: 5,
          backgroundColor: '#fff',
          height: 70,
          width: 70,
          borderRadius: 60,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
          right: 0,
          bottom: 0,
          position: 'absolute',
        }}
      >
        <MaterialIcons name='groups' color={BBThemeColor} size={50} />
      </TouchableOpacity>
      <View style={styles.container}>
        {chats && (
          <FlatList
            keyExtractor={(item) => JSON.stringify(item.createdAt)}
            data={chats}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 0, paddingBottom: 65 }}
            renderItem={(item) => {
              console.log('ITEM ', item)
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.Card}
                  onPress={() =>
                    navigation.navigate('Chat', {
                      title: item.item.title,
                      chatRoom: item.item.chatRoom,
                      image: item.item.image,
                    })
                  }
                >
                  <View style={styles.UserInfo}>
                    <View style={styles.UserImgWrapper}>
                      <Image
                        style={styles.UserImg}
                        source={{ uri: item.item.image }}
                      />
                    </View>

                    <View style={styles.TextSection}>
                      <View style={styles.UserInfoText}>
                        <Text style={styles.UserName}>{item.item.title}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
    backgroundColor: BBThemeColor,
    marginTop: 0,
    paddingTop: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
  },
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  Card: {
    width: '95%',
    marginBottom: 15,
    alignSelf: 'center',
  },
  UserInfo: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: BBThemeColor,
  },
  separator: {
    height: 2,
    backgroundColor: BBLightGreyColor,
    marginTop: -1,
    opacity: 0.2,
  },
  UserImgWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
  },
  UserImg: {
    width: 80,
    height: 80,
  },
  TextSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 0,
    marginLeft: 5,
    width: 250,
  },
  UserInfoText: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
  },
  UserName: {
    fontSize: 18,
    fontWeight: 'bold',
    borderLeftColor: BBLightGreyColor,
    borderLeftWidth: 1,
    paddingLeft: 10,
    width: 220,
    flexWrap: 'wrap',
  },
  PostTime: {
    fontSize: 12,
    color: BBMediumDarkGreyColor,
    position: 'absolute',
    justifyContent: 'flex-end',
    right: 35,
  },
  MessageText: {
    fontSize: 14,
    color: BBDarkGreyColor,
    flexWrap: 'wrap',
    width: windowWidth * 0.7,
  },
})
