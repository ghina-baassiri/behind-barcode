import React from 'react'
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { CommonScreenStyles } from '../utilities/Styles';
import { PRODUCTS_DATA } from '../utilities/Data';
import { PRICES_DATA } from '../utilities/Data';

export default function MarketProductsScreen({ navigation, marketId }) {
  let MARKET_PRODUCTS = []

  let FILTERED_MARKET_PRODUCTS = PRICES_DATA.filter((val) => {
    if(val.market_id === marketId) {
      return val
    }
  })

  // MARKET_PRODUCTS = ADD(FILTERED_MARKET_PRODUCTS.product_id == PRODUCT_DATA(ALL OBJECT))
  // MARKET_PRODUCTS = ADD(PRICES)

  PRODUCTS_DATA.filter((val) => {
    if (FILTERED_MARKET_PRODUCTS.some(val.id)) {
      return val
    }
  })
  

  return (
    <SafeAreaView style={CommonScreenStyles.container}>
          <FlatList
            scrollEventThrottle={16}
            keyExtractor={item => item.id.toString()}
            data={MARKETS_DATA}
            extraData={selectedId}
            renderItem={renderItem}
            {...{onScroll}}
          />
      </SafeAreaView>
  );
}