import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CommonScreenStyles } from '../utilities/Styles';

export default function ChatList({text, navigation}) {

  const [chats, setChats] = useState([]);
  const { user, token } = useContext(AuthContext)

  return (
    <View style={{flex:1, alignItems:'center'}}>
      {/* <Text>Hi</Text> */}
         <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate('Chat')} style={{elevation:10, borderRadius:10, paddingVertical:20, paddingHorizontal:10, width:'90%', backgroundColor:'#1eb980', marginVertical:20}}>
            <Text style={{fontSize:24, textAlign:'center', color:'#fff'}}>
                Group Chat
            </Text>
        </TouchableOpacity>
        {/*<FlatList
          bounces={true}
          keyExtractor={(item, index) => index.toString()}
          data={chats}        
          renderItem={item => {
            
            return (
                <TouchableOpacity    
                  activeOpacity={.9}               
                  style={ ListStyles.itemWrapper }
                  onPress={() => navigation.navigate('ProductMarkets', { product: item.item})}
                >
                  <View style={{ elevation:3, flexDirection:'row', padding: 10, alignContent:'center', borderColor: '#1eb980', borderWidth:1, borderRadius:20, backgroundColor:'#fff'}}>
                      <Svg width={90} height={90} style={{ paddingVertical:10, marginRight:5}}>
                          <SvgImage
                              href={item.item.image}
                              width={80}
                              height={80}                                
                          />
                      </Svg>
                      <View >
                          <Text style={{ color:'#000', fontSize:16, marginTop:7, fontWeight:'bold'}}>{item.item.brand}</Text>
                      
                          <Text style={{paddingVertical:1}}>{item.item.category}</Text>

                          <Text style={{paddingVertical:1}}>{item.item.size + ' ' + item.item.unit}</Text>
                      </View>  
                      <View style={{position:'absolute', right:3, top:83}}>
                        <MaterialIcons
                          name='navigate-next'
                          color='#000'
                          size={20}
                        />
                      </View> 

                  </View>
                </TouchableOpacity>
                  )}}
                
                showsVerticalScrollIndicator={false}              
                contentContainerStyle={{paddingTop:5,paddingBottom:65}}
                /> */}
    </View>

  );
}
