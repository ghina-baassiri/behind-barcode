import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import MarketCallout from '../components/MarketCallout';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import { MapStyles } from '../utilities/Styles';
import Svg from 'react-native-svg';
import {Image as SvgImage}  from 'react-native-svg';

import axios from 'axios';


export default function MapScreen() {
    const [initialRegion, setInitialRegion] = useState({
        latitude: 33.84,
        longitude: 35.6,
        latitudeDelta:0.8,
        longitudeDelta: 0.8
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [markets, setMarkets] = useState([]);
    const [showMarketCallout, setShowMarketCallout] = useState(false);

    const { token } = useContext(AuthContext)

    async function getCurrentLocation() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                let location = await Location.getLastKnownPositionAsync({})
                setInitialRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta:0.8,
                    longitudeDelta: 0.8
                })
            }
            let location = await Location.getCurrentPositionAsync({})
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta:0.8,
                longitudeDelta: 0.8
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

    useEffect(() => {
        getCurrentLocation() 
        fetchAllMarkets()          
    }, [])

    return (
            
        <MapView 
            provider={PROVIDER_GOOGLE}
            style={MapStyles.map} 
            loadingEnabled={true}
            followUserLocation={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            zoomEnabled={true}
            initialRegion={initialRegion}            
        >
            
            {markets.map(market => (
              <>
                {console.log('------------------market:', market)}
                
                <Marker
                    key={market.id}
                    coordinate={{
                      longitude: market.address.longitude,
                      latitude: market.address.latitude,
                    }}
                    onPress={()=>{setShowMarketCallout(true)}}
                >
                    {showMarketCallout ? <MarketCallout market={market}/> : null}
                    <View style={{ flexDirection:'row', alignContent:'center', justifyContent:'center',backgroundColor: '#1eb980', borderRadius:20,  }}>
                        <Svg width={30} height={30} style={{ left: -1}}>
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
                    {/* <Callout tooltip>
                        <MarketCallout/>
                    </Callout>       */}
            </Marker>
            </>
            ))}

        </MapView>
    );
}
