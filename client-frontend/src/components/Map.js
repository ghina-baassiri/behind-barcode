import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { MapStyles } from '../utilities/Styles';

export default function Map() {
    const [initialRegion, setInitialRegion] = useState({
        latitude: 33.84,
        longitude: 35.6,
        latitudeDelta:0.8,
        longitudeDelta: 0.8
    });
    const [errorMsg, setErrorMsg] = useState(null);


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

    useEffect(() => {
        getCurrentLocation()    
    }, [])

    return (
        <MapView 
            style={MapStyles.map} 
            loadingEnabled={true}
            followUserLocation={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            zoomEnabled={true}
            initialRegion={initialRegion}            
        >
            { console.log('Getting current location: ', initialRegion)
}
            <MapView.Marker
                coordinate={{
                    latitude: 33.888630,
                    longitude: 35.495480,
                }}
                title={"Beirut"}
                description={"We are in Beirut"}
            />
            <MapView.Marker
                coordinate={{
                    latitude: 33.55,
                    longitude: 35.37,
                }}
                title={"Saida"}
                description={"We are in Saida"}
            />
            <MapView.Marker
                coordinate={{
                    latitude: 33.52,
                    longitude: 35.50,
                }}
                title={"Zahle"}
                description={"We are in Zahle"}
            />
               
        </MapView>
    );
}
