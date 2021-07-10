import React, { useState, useEffect, useContext } from 'react'
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  Modal,
  StyleSheet,
} from 'react-native'
import { BBThemeColor } from '../utilities/Colors'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import { AuthContext } from '../navigation/AuthProvider'

export default function MarketCallout({
  user,
  market,
  showMarketCallout,
  setShowMarketCallout,
  navigation,
}) {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])
  const [defaultRating, setDefaultRating] = useState(null)
  const [rated, setRated] = useState(false)
  const [wantToRate, setWantToRate] = useState(false)
  const { token } = useContext(AuthContext)

  //Functional component a display view of the market's rating
  function RatingView() {
    var stars = []
    const numOfStars = defaultRating
    if (numOfStars > 0) {
      for (let i = 0; i < numOfStars; i++) {
        stars.push(
          <Image
            key={'stars_' + i}
            source={require('../../assets/star.png')}
            resizeMode='contain'
            style={{
              width: 21,
              height: 21,
              marginRight: 3,
              tintColor: '#ffda00',
            }}
          />
        )
      }
    }
    if (numOfStars != 5) {
      for (let i = 0; i < 5 - numOfStars; i++) {
        stars.push(
          <Image
            key={'stars_empty' + i}
            source={require('../../assets/star_outline.png')}
            resizeMode='contain'
            style={{
              width: 21,
              height: 21,
              marginRight: 3,
              tintColor: '#ffda00',
            }}
          />
        )
      }
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>
  }

  //Functional cpmponent showing the bar which is used to rate a market
  const CustomRatingBar = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={item}
              onPress={() => {
                setDefaultRating(item)
                console.log('star clicked', item)
              }}
            >
              <Image
                style={{
                  width: 21,
                  height: 21,
                  marginRight: 3,
                  tintColor: '#1eb980',
                }}
                source={
                  item <= defaultRating
                    ? require('../../assets/star.png')
                    : require('../../assets/star_outline.png')
                }
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  // Fetch api returning boolean if the user has rated a specific market
  const fetchRated = (userId, marketId) => {
    axios
      .get(`http://192.168.43.152:8000/api/rated/${marketId}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRated(response.data.rated)
      })
      .catch((err) => {
        console.log('rated Error: ', err)
      })
  }

  // Send post request to add user rating of a specific market
  const rate = (userId, marketId, rating) => {
    const data = { user_id: userId, market_id: marketId, stars: rating }
    axios
      .post(`http://192.168.43.152:8000/api/addRating`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return
      })
      .catch((err) => {
        console.log('Rate Error: ', err)
      })
  }

  const rating = (marketId) => {
    axios
      .get(`http://192.168.43.152:8000/api/marketRating/${marketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDefaultRating(response.data.rating)

        return
      })
      .catch((err) => {
        console.log('Rate Error: ', err)
      })
  }

  useEffect(() => {
    fetchRated(user._id, market.id)
    if (defaultRating === null) {
      setDefaultRating(market.rating)
    }
  }, [defaultRating])

  return (
    <Modal animationType='slide' visible={showMarketCallout} transparent={true}>
      <View style={styles.modalBg}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontSize: 22,
                left: 12,
              }}
            >
              {market.name}
            </Text>
            <Feather
              name='x'
              size={19}
              color='#fff'
              style={{ top: 13, right: 10, position: 'absolute' }}
              onPress={() => {
                setShowMarketCallout(false)
              }}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 5 }}>
            <Image
              source={{ uri: market.logo }}
              style={{ marginVertical: 10, height: 150, width: 150 }}
            />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: 15, marginBottom: 5 }}>
              {market.phone.slice(0, 2) + ' ' + market.phone.slice(2, 9)}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginBottom: 10 }}>Delivery: </Text>
              {market.delivery ? (
                <Feather
                  name='truck'
                  size={17}
                  color='#1eb980'
                  style={{ top: 1 }}
                />
              ) : (
                <Feather
                  name='truck'
                  size={17}
                  color='red'
                  style={{ top: 1 }}
                />
              )}
            </View>

            <View>
              {wantToRate && (
                <View>
                  <CustomRatingBar />
                  <Text
                    style={styles.textStyleSmall}
                    onPress={() => {
                      rate(user._id, market.id, defaultRating)
                      rating(market.id)
                      setWantToRate(false)
                    }}
                  >
                    Click here when done
                  </Text>
                </View>
              )}

              {!wantToRate && (
                <View>
                  <RatingView />
                  {!rated && (
                    <Text
                      style={styles.textStyleSmall}
                      onPress={() => {
                        setWantToRate(true)
                      }}
                    >
                      Please Rate Us
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setShowMarketCallout(false)
                navigation.navigate('MarketStack', {
                  screen: 'MarketProducts',
                  params: { market: market },
                })
              }}
              style={styles.btn}
            >
              <Text style={styles.btnText}>View Products</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',

    borderRadius: 20,
    elevation: 20,
  },
  footer: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: -5,
    marginVertical: -10,
  },
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: BBThemeColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
  },
  btn: {
    width: '35%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: BBThemeColor,
    marginHorizontal: 10,
    width: '40%',
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 11,
    color: '#000',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
})
