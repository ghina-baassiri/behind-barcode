import React, { useState, useEffect, useContext } from 'react'
import { useIsFocused } from '@react-navigation/native'
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  LogBox,
  ActivityIndicator,
  Keyboard,
  TextInput,
} from 'react-native'
import { BBThemeColor } from '../utilities/Colors'
import { BBGreyColor } from '../utilities/Colors'
import { BBLightGreyColor } from '../utilities/Colors'
import { AuthContext } from '../navigation/AuthProvider'
import { windowWidth } from '../utilities/Dimensions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'

export default function ProductMarketsScreen({ route, navigation }) {
  LogBox.ignoreAllLogs()

  const { token } = useContext(AuthContext)
  const [markets, setMarkets] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [borderWidth, setBorderWidth] = useState(1)
  const [filteredMarkets, setFilteredMarkets] = useState([])
  const [search, setSearch] = useState('')
  const [showProductCard, setShowProductCard] = useState(true)
  const [searchTextInputMarginTop, setSearchTextInputMarginTop] = useState(0)
  const product = route.params.product
  const isFocusedHistory = useIsFocused()

  // Fetches all markets having a specific product available
  function fetchProductMarkets(product) {
    axios
      .get(`http://192.168.43.152:8000/api/productMarkets/${product.barcode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('GOT MARKETS OF ', product.brand)
        if (response.status === 200) {
          setLoading(false)
          setMarkets(response.data.markets)
          setFilteredMarkets(response.data.markets)
        }
      })
      .catch((err) => {
        setLoading(false)
        setErrorMsg(err)
        console.log('Fetch Product Markets Error: ', err)
      })
  }

  // Handles the user search from the product's markets list
  const searchFilter = (text) => {
    if (text) {
      const newData = markets.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setFilteredMarkets(newData)
      setSearch(text)
    } else {
      setFilteredMarkets(markets)
      setSearch(text)
    }
  }

  const onFocus = () => {
    setBorderWidth(2)
  }

  const onBlur = () => {
    setBorderWidth(1)
  }

  const keyboardDidShow = () => {
    setShowProductCard(false)
  }

  const keyboardDidHide = () => {
    setShowProductCard(true)
  }

  useEffect(() => {
    setSearchTextInputMarginTop(10)
  }, [showProductCard])

  // Refetches the product markets on every screen load
  useEffect(() => {
    setLoading(true)
    fetchProductMarkets(product)
    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)
  }, [isFocusedHistory])

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ position: 'absolute', top: -40, left: 320, zIndex: 1 }}
        onPress={() => {
          let room = product.brand.split(' ').join('')
          console.log('go to chat room : ', room)
          navigation.navigate('ChatStack', {
            screen: 'Chat',
            params: {
              title: product.brand,
              chatRoom: `${room}_${product.barcode}`,
              image: product.image,
            },
          })
        }}
      >
        <Image
          source={require('../../assets/chat.png')}
          resizeMode='contain'
          style={{ width: 30, height: 30, tintColor: '#fff', right: 20 }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {/* Product */}
        {showProductCard && (
          <View
            style={{
              ...styles.mainItemWrapper,
              paddingHorizontal: 15,
              marginTop: 20,
            }}
          >
            <Image
              source={{ uri: product.image }}
              resizeMode='contain'
              style={styles.image}
            />
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginBottom: 10,
                fontWeight: 'bold',
                flexWrap: 'wrap',
                textAlign: 'center',
                alignSelf: 'center',
              }}
            >
              {product.brand}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 13,
                marginBottom: 2,
                alignSelf: 'center',
              }}
            >
              {product.category}
            </Text>
            <Text style={{ fontSize: 13, textAlign: 'center' }}>
              {product.size} {product.unit}
            </Text>
          </View>
        )}
        {/* Price per market */}

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Feather
            name='search'
            size={20}
            color={BBLightGreyColor}
            style={{ position: 'absolute', right: 18, top: 17, zIndex: 1 }}
            onPress={() => Keyboard.dismiss()}
          />
          <TextInput
            style={{
              ...styles.textInput,
              ...styles.listWidth,
              marginBottom: 5,
              borderWidth: borderWidth,
              marginTop: searchTextInputMarginTop,
            }}
            value={search}
            placeholder='Search Market'
            underlineColorAndroid='transparent'
            onChangeText={(text) => searchFilter(text)}
            onFocus={() => onFocus()}
            onBlur={() => onBlur()}
          />
          <View
            style={{
              ...styles.listWidth,
              flexDirection: 'row',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: BBGreyColor,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: BBThemeColor,
              height: 35,
              elevation: 3,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                borderRightWidth: 1,
                width: '68%',
                borderColor: BBGreyColor,
                color: '#fff',
              }}
            >
              Market
            </Text>
            <View
              style={{
                width: '32%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                Price{' '}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                (LBP)
              </Text>
            </View>
          </View>

          {loading && (
            <ActivityIndicator
              size='large'
              color={BBThemeColor}
              animating={true}
              style={{
                opacity: 1,
                position: 'absolute',
                right: 0,
                left: 0,
                top: 150,
                bottom: 50,
              }}
            />
          )}
          {!loading && errorMsg != '' && (
            <Text style={{ color: BBLightGreyColor, fontSize: 20, top: 70 }}>
              No Products
            </Text>
          )}
          {!loading && markets != [] && (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={filteredMarkets}
              renderItem={(item) => {
                return (
                  <View
                    style={{
                      ...styles.listWidth,
                      flexDirection: 'row',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: BBGreyColor,
                      backgroundColor: '#fff',
                      height: 50,
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        width: styles.listWidth.width * 0.68,
                        justifyContent: 'center',
                        height: '100%',
                        paddingHorizontal: 4,
                      }}
                      onPress={() => {
                        navigation.navigate('MarketStack', {
                          screen: 'MarketProducts',
                          params: { market: item.item },
                        })
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            height: 'auto',
                            textAlign: 'center',
                            fontSize: 16,
                            color: '#000',
                          }}
                        >
                          {item.item.name}
                        </Text>
                        <Text
                          style={{
                            height: 'auto',
                            textAlign: 'center',
                            fontSize: 13,
                            color: '#000',
                            fontStyle: 'italic',
                          }}
                        >
                          {item.item.address.address}
                        </Text>
                      </View>
                      <MaterialIcons
                        name='navigate-next'
                        color='#000'
                        size={20}
                        style={{
                          paddingLeft: 5,
                          position: 'absolute',
                          right: 3,
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '32%',
                        height: '100%',
                        borderLeftWidth: 1,
                        borderColor: BBGreyColor,
                      }}
                    >
                      <Text style={{ textAlign: 'center', fontSize: 16 }}>
                        {item.item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                  </View>
                )
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 1, paddingBottom: 65 }}
            />
          )}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
  },
  header: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    backgroundColor: BBThemeColor,
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    color: '#fff',
    fontSize: 22,
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
    tintColor: BBThemeColor,
  },
  textInput: {
    height: 35,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: BBThemeColor,
  },
  mainItemWrapper: {
    width: windowWidth * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    alignContent: 'center',
    textAlign: 'center',
    borderColor: BBThemeColor,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  listWidth: {
    width: windowWidth * 0.92,
  },
})
