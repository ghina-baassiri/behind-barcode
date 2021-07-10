import React, { useState, useEffect, useContext } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native'
import { BBThemeColor } from '../utilities/Colors'
import { AuthContext } from '../navigation/AuthProvider'
import { windowWidth } from '../utilities/Dimensions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ActivityIndicator } from 'react-native-paper'
import Svg from 'react-native-svg'
import { Image as SvgImage } from 'react-native-svg'
import axios from 'axios'

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [borderWidth, setBorderWidth] = useState(1)

  const { token } = useContext(AuthContext)

  // Fetch all products registered in database
  const fetchAllProducts = () => {
    axios
      .get(`http://192.168.43.152:8000/api/allProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        setProducts(response.data.products)
        setFilteredProducts(response.data.products)
        return
      })
      .catch((err) => {
        console.log('The Error: ', err)
      })
  }

  // Handles the user search from the products list
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
    setBorderWidth(2.5)
  }

  const onBlur = () => {
    setBorderWidth(1)
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <View style={styles.container}>
      {isLoading && (
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
      <View
        style={{
          paddingVertical: 5,
          backgroundColor: BBThemeColor,
          zIndex: 1,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{ ...styles.textInput, borderWidth: borderWidth }}
          value={search}
          placeholder='Search Product'
          underlineColorAndroid='transparent'
          onChangeText={(text) => searchFilter(text)}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
        />
      </View>
      <FlatList
        bounces={true}
        keyExtractor={(item, index) => index.toString()}
        data={filteredProducts}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.itemWrapper}
              onPress={() =>
                navigation.navigate('ProductMarkets', { product: item.item })
              }
            >
              <View
                style={{
                  elevation: 3,
                  flexDirection: 'row',
                  padding: 10,
                  alignContent: 'center',
                  borderColor: BBThemeColor,
                  borderWidth: 1,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                }}
              >
                <Svg
                  width={90}
                  height={90}
                  style={{ paddingVertical: 10, marginRight: 5 }}
                >
                  <SvgImage href={item.item.image} width={80} height={80} />
                </Svg>
                <View>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      marginTop: 7,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.item.brand}
                  </Text>

                  <Text style={{ paddingVertical: 1 }}>
                    {item.item.category}
                  </Text>

                  <Text style={{ paddingVertical: 1 }}>
                    {item.item.size + ' ' + item.item.unit}
                  </Text>
                </View>
                <View style={{ position: 'absolute', right: 3, top: 83 }}>
                  <MaterialIcons name='navigate-next' color='#000' size={20} />
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 5, paddingBottom: 65 }}
      />
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
  textInput: {
    height: 50,
    width: windowWidth * 0.9,
    paddingLeft: 20,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: BBThemeColor,
  },
  itemWrapper: {
    width: windowWidth * 0.92,
    marginVertical: 3,
  },
})
