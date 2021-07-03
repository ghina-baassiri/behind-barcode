import React, { useState, useEffect, useContext } from 'react';
import { Text, View, LogBox } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import MarketCallout from '../components/MarketCallout';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import { MapStyles, CommonScreenStyles } from '../utilities/Styles';
import Svg from 'react-native-svg';
import {Image as SvgImage}  from 'react-native-svg';
import axios from 'axios';


export default function MapScreen({navigation}) {
    LogBox.ignoreAllLogs();

    const [initialRegion, setInitialRegion] = useState({
        latitude: 33.84,
        longitude: 35.6,
        latitudeDelta:0.8,
        longitudeDelta: 0.8
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [markets, setMarkets] = useState([]);
    const [market, setMarket] = useState([]);
    const [showMarketCallout, setShowMarketCallout] = useState(false);
    const [tracksViewChanges, setTracksViewChanges] = useState(true);
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
                    latitudeDelta:0.7,
                    longitudeDelta: 0.7
                })
            }
            let location = await Location.getCurrentPositionAsync({})
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta:0.7,
                longitudeDelta: 0.7
            })

        } catch (error) {
            console.log(error);
        }
    }

    const fetchAllMarkets = () => {
        axios.get(`http://192.168.43.152:8000/api/allMarkets`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then(response => {        
          setMarkets(response.data.markets)
          
          return
        })
        .catch(err => {
        console.log('The Error: ', err)      
        })   
    }

    const onMarkerPress = (market) => {
        console.log('pressed',market,'show',showMarketCallout)
        setMarket(market)
        setShowMarketCallout(true)
    }

    const stopRendering = () =>
    {
        setTracksViewChanges(false)
    }

    useEffect(() => {
        getCurrentLocation() 
        fetchAllMarkets()          
    }, [])

    return (
        <View style={CommonScreenStyles.container}>
        {showMarketCallout ? <MarketCallout key={index=>index} user={user} showMarketCallout={showMarketCallout} setShowMarketCallout={setShowMarketCallout} market={market} navigation={navigation}/> : null}        
            
        <MapView 
            // provider={PROVIDER_GOOGLE}
            style={MapStyles.map} 
            loadingEnabled={true}
            followUserLocation={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            zoomEnabled={true}
            initialRegion={initialRegion}        
            tracksViewChanges={tracksViewChanges}    
        >
            
            {markets.map(market => (
              <View  key={market.id}>                
                <Marker
                    coordinate={{
                      longitude: market.address.longitude,
                      latitude: market.address.latitude,
                    }}
                    onPress={()=>{onMarkerPress(market)}}
                >
                    <View style={{ flexDirection:'row', alignContent:'center', justifyContent:'center',backgroundColor: '#1eb980', borderRadius:20,  }}>
                        <Svg width={30} height={30} style={{ left: -1}} onLoad={stopRendering}>
                            <SvgImage
                                href={market.logo}
                                width={30}
                                height={30}                 
                            />
                        </Svg>
                        <Text
                            style={{
                                alignSelf:'center',
                                marginHorizontal:5,
                                fontSize: 10,
                                color: '#ffffff',
                                fontWeight: 'bold',
                                
                            }}
                        >{market.name}</Text>       
                    </View>
            </Marker>
            </View>
            ))}

        </MapView>
        </View>
    );
}

