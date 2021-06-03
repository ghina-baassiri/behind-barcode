import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList, Animated  } from 'react-native'
import { MARKETS_DATA } from '../utilities/Data';
import { y, onScroll } from '../utilities/Animation';
import MarketItem from '../components/MarketItem';
import { CommonScreenStyles } from '../utilities/Styles';


export default function MarketsScreen({ navigation }) {

  const [selectedId, setSelectedId] = useState(null);
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

  // Handle those sideeffects of change of selectedId state
  useEffect(() => {
    console.log('_____________________')
    console.log('selectedId changed: ', selectedId)
    
  }, [selectedId])

  const onItemPress = ({ item }) => {
    setSelectedId(item.id)
    console.log('navigate')
    navigation.navigate('MarketProducts', { marketId: selectedId })
  }


  const renderItem = ({ item }) => {

    return (
      <MarketItem
        item={item}
        onPress={({item})=> {
          console.log('item: ', item)
          onItemPress({item})
        }}
      />
    )
  }

  return (
      <View style={CommonScreenStyles.container}>
          <FlatList
            bounces={true}
            keyExtractor={item => item.id.toString()}
            data={MARKETS_DATA}
            extraData={selectedId}
            renderItem={item =>{
              console.log('item1: ', item)
              return (
                <MarketItem
                  item={item}
                  setSelectedId={setSelectedId}
                />
              )}}
            contentContainerStyle={{paddingTop:0}}
            {...{onScroll}}
          />
      </View> 

  );
}