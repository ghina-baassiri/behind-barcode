import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  FlatList,
} from 'react-native'
import { BBThemeColor } from '../utilities/Colors'
import { BBLightGreyColor } from '../utilities/Colors'
import { BBMediumDarkGreyColor } from '../utilities/Colors'
import { BBDarkGreyColor } from '../utilities/Colors'
import { AuthContext } from '../navigation/AuthProvider'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { windowWidth, windowHeight } from '../utilities/Dimensions'
import { BadgeContext } from '../navigation/BadgeProvider'
import { ActivityIndicator } from 'react-native-paper'
import { firebaseConfig } from '../utilities/config'
import firebase from 'firebase'
require('firebase/firestore')

export default function NotificationsScreen({ navigation }) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app()
  }

  const db = firebase.firestore()

  const [allMessages, setAllMessages] = useState([])
  const [userMessages, setUserMessages] = useState([])
  const [products, setProducts] = useState({})
  const [loaded, setLoaded] = useState(false)
  const { user, token } = useContext(AuthContext)
  const { badge, setBadge } = useContext(BadgeContext)
  const isFocused = useIsFocused()
  let items_temp = {}
  let userId = user._id

  useEffect(() => {
    console.log('PRODUCTS ', products)
    db.collection('notifications').onSnapshot((collection) => {
      db.collection('notifications')
        .orderBy('createdAt', 'desc')
        .get()
        .then((snapshot) => {
          let msgs = snapshot.docs.map((doc, index) => ({
            barcode: doc.data().barcode,
            createdAt: doc.data().createdAt.toDate(),
            details: doc.data().details,
            title: doc.data().title,
            usersSeen: doc.data().usersSeen,
          }))
          setAllMessages(msgs)
        })
    })
  }, [])

  useEffect(() => {
    let userMsgs = []
    let seen = false
    if (allMessages) {
      for (let j = 0; j < allMessages.length; j++) {
        if (
          !allMessages[j].usersSeen ||
          (allMessages[j].usersSeen &&
            !allMessages[j].usersSeen.hasOwnProperty(user._id))
        ) {
          userMsgs.push(allMessages[j])
        }
      }
      setUserMessages(userMsgs)
    }
  }, [allMessages])

  useEffect(() => {
    // setBadge(count)
    setLoaded(true)
    if (userMessages.length > 0) fetchAllProducts()
  }, [userMessages])

  const fetchAllProducts = () => {
    axios
      .get(`http://192.168.43.152:8000/api/allProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        for (let i = 0; i < response.data.products.length; i++) {
          items_temp[response.data.products[i].barcode] =
            response.data.products[i]
        }
        setProducts(items_temp)
      })
      .catch((err) => {
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

    if (date === today) return true
    return false
  }

  const setNotificationSeen = (brand) => {
    db.doc(`notifications/${brand}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          if (snapshot.data().usersSeen) {
            let seenBy = snapshot.data().usersSeen
            seenBy[userId] = true
            db.doc(`notifications/${brand}`).update({
              usersSeen: seenBy,
            })
          } else {
            let idDict = {}
            idDict[userId] = true
            db.doc(`notifications/${brand}`).set(
              {
                usersSeen: idDict,
              },
              { merge: true }
            )
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

  return (
    <>
      {!loaded && (
        <ActivityIndicator
          size='large'
          color={BBThemeColor}
          animating={true}
          style={{
            opacity: 1,
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
          }}
        />
      )}
      <View styles={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
        {Object.keys(products).length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: windowHeight * 0.4,
            }}
          >
            <Text style={{ color: BBLightGreyColor, fontSize: 20 }}>
              No Notifications
            </Text>
          </View>
        )}

        <FlatList
          horizontal={false}
          data={userMessages}
          keyExtractor={(item) => JSON.stringify(item.createdAt)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 0,
            marginHorizontal: 20,
            paddingBottom: 65,
          }}
          renderItem={({ item }) => (
            <>
              {products && products[item.barcode] && (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.card}
                  onPress={() => {
                    let newCount = badge - 1
                    setBadge(newCount)
                    setNotificationSeen(products[item.barcode].brand)
                    resetStates()
                    navigation.navigate('ProductStack', {
                      screen: 'ProductMarkets',
                      params: { product: products[item.barcode] },
                    })
                  }}
                >
                  <View style={styles.userInfo}>
                    <View style={styles.userImgWrapper}>
                      <Image
                        style={styles.userImg}
                        source={{ uri: products[item.barcode].image }}
                        // onLoad={onImageLoaded}
                      />
                    </View>
                    <View style={styles.textSection}>
                      <View style={styles.userInfoText}>
                        <Text style={styles.userName}>{item.title}</Text>
                        <Text style={styles.postTime}>
                          {!checkDate(item.createdAt)
                            ? item.createdAt.toLocaleDateString()
                            : item.createdAt.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              })}
                        </Text>
                      </View>
                      <Text style={styles.messageText}>{item.details}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  textSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: BBLightGreyColor,
  },
  userInfoText: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: BBMediumDarkGreyColor,
    position: 'absolute',
    justifyContent: 'flex-end',
    right: 40,
    top: 4,
  },
  messageText: {
    fontSize: 14,
    color: BBDarkGreyColor,
    flexWrap: 'wrap',
    width: windowWidth * 0.7,
  },
})
