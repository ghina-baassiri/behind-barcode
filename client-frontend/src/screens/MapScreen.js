import React, { useState, useEffect, useContext } from 'react'
import {
  Text,
  View,
  LogBox,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import { BBThemeColor } from '../utilities/Colors'
import MarketCallout from '../components/MarketCallout'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import Svg from 'react-native-svg'
import { Image as SvgImage } from 'react-native-svg'
import { windowHeight, windowWidth } from '../utilities/Dimensions'
import axios from 'axios'

export default function MapScreen({ navigation }) {
  LogBox.ignoreAllLogs()

  const [initialRegion, setInitialRegion] = useState({
    latitude: 33.84,
    longitude: 35.6,
    latitudeDelta: 0.9,
    longitudeDelta: 0.9,
  })
  const [errorMsg, setErrorMsg] = useState(null)
  const [markets, setMarkets] = useState([])
  const [market, setMarket] = useState([])
  const [showMarketCallout, setShowMarketCallout] = useState(false)
  const [trackChanges, setTrackChanges] = useState(true)
  const [loading, setLoading] = useState(true)
  const { user, token } = useContext(AuthContext)

  async function getCurrentLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        let location = await Location.getLastKnownPositionAsync({})
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        })
      }
      let location = await Location.getCurrentPositionAsync({})
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.7,
        longitudeDelta: 0.7,
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch all markets registered in database
  const fetchAllMarkets = () => {
    axios
      .get(`http://192.168.43.152:8000/api/allMarkets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false)
        setMarkets(response.data.markets)
      })
      .catch((err) => {
        console.log('The Error: ', err)
      })
  }

  const onMarkerPress = (market) => {
    setMarket(market)
    setShowMarketCallout(true)
  }

  useEffect(() => {
    setLoading(true)
    getCurrentLocation()
    fetchAllMarkets()
  }, [])

  return (
    <View style={styles.container}>
      {showMarketCallout ? (
        <MarketCallout
          key={(index) => index}
          user={user}
          showMarketCallout={showMarketCallout}
          setShowMarketCallout={setShowMarketCallout}
          market={market}
          navigation={navigation}
        />
      ) : null}
      {loading && (
        <ActivityIndicator
          size='large'
          color={BBThemeColor}
          animating={true}
          style={styles.activityIndicator}
        />
      )}

      <MapView
        style={styles.map}
        loadingEnabled={true}
        followUserLocation={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        initialRegion={initialRegion}
      >
        {markets.map((market) => (
          <View key={market.id}>
            <Marker
              coordinate={{
                longitude: market.address.longitude,
                latitude: market.address.latitude,
              }}
              tracksViewChanges={trackChanges}
              onPress={() => {
                onMarkerPress(market)
              }}
            >
              <View style={styles.marker}>
                <Svg
                  width={30}
                  height={30}
                  style={{ left: -1 }}
                  onLoad={() => setTrackChanges(false)}
                >
                  <SvgImage href={market.logo} width={30} height={30} />
                </Svg>
                <Text style={styles.markerText}>{market.name}</Text>
              </View>
            </Marker>
          </View>
        ))}
      </MapView>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  map: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },
  marker: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: BBThemeColor,
    borderRadius: 20,
  },
  markerText: {
    alignSelf: 'center',
    marginHorizontal: 5,
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  activityIndicator: {
    opacity: 1,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
})
