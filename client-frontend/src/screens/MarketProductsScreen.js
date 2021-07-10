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
  TextInput,
  Keyboard,
} from 'react-native'
import { BBThemeColor } from '../utilities/Colors'
import { BBGreyColor } from '../utilities/Colors'
import { BBLightGreyColor } from '../utilities/Colors'
import { AuthContext } from '../navigation/AuthProvider'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'
import Feather from 'react-native-vector-icons/Feather'
import { windowWidth } from '../utilities/Dimensions'

export default function MarketProductsScreen({ route, navigation }) {
  LogBox.ignoreAllLogs()

  const { user, token } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [rated, setRated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [borderWidth, setBorderWidth] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState('')
  const [showMarketCard, setShowMarketCard] = useState(true)
  const [searchTextInputMarginTop, setSearchTextInputMarginTop] = useState(0)
  const market = route.params.market
  const isFocusedHistory = useIsFocused()

  const fetchRated = (userId, marketId) => {
    axios
      .get(`http://192.168.43.152:8000/api/rated/${marketId}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('GOT RATED OF ', market.name)
        setRated(response.data.rated)
        return
      })
      .catch((err) => {
        console.log('rated Error: ', err)
      })
  }

  // Fetches all products available at a specific market
  function fetchMarketProducts(market) {
    axios
      .get(`http://192.168.43.152:8000/api/marketProducts/${market.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('GOT PRODUCTS OF ', market.name)
        if (response.status === 200) {
          setLoading(false)
          setProducts(response.data.products)
          setFilteredProducts(response.data.products)
        }
      })
      .catch((err) => {
        setLoading(false)
        setErrorMsg(err)
        console.log('fetchMarketProducts Error: ', err)
      })
  }

  // Handles the user search from the markets's products list
  const searchFilter = (text) => {
    if (text) {
      const newData = products.filter((item) => {
        const itemData = item.brand
          ? item.brand.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setFilteredProducts(newData)
      setSearch(text)
    } else {
      setFilteredProducts(products)
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
    setShowMarketCard(false)
  }

  const keyboardDidHide = () => {
    setShowMarketCard(true)
  }

  useEffect(() => {
    setSearchTextInputMarginTop(10)
  }, [showMarketCard])

  // Refetches the market products on every screen load
  useEffect(() => {
    setLoading(true)
    fetchRated(user._id, market.id)
    fetchMarketProducts(market)
    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)
  }, [isFocusedHistory])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {/* Market */}
      {showMarketCard && (
        <View
          style={{
            ...styles.mainItemWrapper,
            paddingHorizontal: 15,
            marginTop: 20,
          }}
        >
          <Image
            source={{ uri: market.logo }}
            resizeMode='contain'
            style={styles.image}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              marginBottom: 10,
              fontWeight: 'bold',
            }}
          >
            {market.name}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate('Map', { address: market.address })
            }
          >
            <Image
              source={require('../../assets/map.png')}
              resizeMode='contain'
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              marginBottom: 2,
              textAlign: 'center',
            }}
          >
            {market.phone.slice(0, 2) + ' ' + market.phone.slice(2, 9)}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginBottom: 4 }}>Delivery: </Text>
            {market.delivery ? (
              <Feather
                name='truck'
                size={17}
                color={BBThemeColor}
                style={{ top: 1 }}
              />
            ) : (
              <Feather name='truck' size={17} color='red' style={{ top: 1 }} />
            )}
          </View>
          <Text style={{ marginBottom: 4, fontSize: 13, textAlign: 'center' }}>
            {market.address.address}
          </Text>

          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <RatingView numOfStars={market.rating} />
          </View>
          <View></View>
        </View>
      )}

      {/* Products prices */}
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
          placeholder='Search Product'
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
              borderColor: BBThemeColor,
              color: '#fff',
            }}
          >
            Product
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
              top: 250,
              bottom: 0,
            }}
          />
        )}
        {!loading && errorMsg != '' && (
          <Text style={{ color: BBLightGreyColor, fontSize: 20, top: 70 }}>
            No Products
          </Text>
        )}
        {!loading && filteredProducts != [] && (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={filteredProducts}
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
                    height: 60,
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
                      paddingHorizontal: 2,
                    }}
                    onPress={() => {
                      navigation.navigate('ProductStack', {
                        screen: 'ProductMarkets',
                        params: { product: item.item },
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
                          borderBottomColor: BBThemeColor,
                        }}
                      >
                        {item.item.brand}{' '}
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
                        {item.item.size} {item.item.unit}
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
                        bottom: 3,
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
  )
}

function RatingView(numOfStars) {
  var stars = []
  if (numOfStars.numOfStars > 0) {
    for (let i = 0; i < numOfStars.numOfStars; i++) {
      stars.push(
        <Image
          key={'stars_' + i}
          source={require('../../assets/star.png')}
          resizeMode='contain'
          style={{
            width: 19,
            height: 19,
            marginRight: 2,
            tintColor: BBThemeColor,
          }}
        />
      )
    }
  }
  if (numOfStars.numOfStars != 5) {
    for (let i = 0; i < 5 - numOfStars.numOfStars; i++) {
      stars.push(
        <Image
          key={'stars_empty' + i}
          source={require('../../assets/star_outline.png')}
          resizeMode='contain'
          style={{
            width: 19,
            height: 19,
            marginRight: 2,
            tintColor: BBGreyColor,
          }}
        />
      )
    }
  }
  return <View style={{ flexDirection: 'row' }}>{stars}</View>
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 4,
    borderRadius: 10,
  },
  btn: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: BBThemeColor,
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
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
