import React from 'react';
import { TouchableOpacity, Text, Image, View, Modal, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


export default function MarketCallout({market}) {

    console.log('**********************market:', market)
    return (
        <Modal animationType='slide' visible={true} transparent={true} >
            <View style={styles.modalBg}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={{color:'#fff', alignSelf:'center', fontSize:22}}>{market.name}</Text>
                    </View>
                    <View style={{alignItems:'center', marginTop:5}}>
                        <Image source={{uri:market.logo}} style={{ marginVertical:10, height:150, width:150}}/>
                    </View>

                    <View style={{alignItems:'center', }}>
                        <Text style={{ color:'#000', fontSize:15, marginBottom:5}}>{market.phone}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginBottom:10}}>Delivery: </Text> 
                            {market.delivery ? 
                            <Feather
                                name='truck'
                                size={17}
                                color='#1eb980'
                                style={{top:1}}
                            /> : 
                            <Feather
                                name='truck'
                                size={17}
                                color='#cbcbcb'
                                style={{top:1}}
                            />}
                            
                        </View>
              
                        <View style={{flexDirection:'row', marginBottom:5}}>
                            {<RatingView numOfStars={market.rating}/>}                  
                        </View> 
                    </View>

                    <View style={{...styles.footer, flexDirection:'row' }}>
                        <TouchableOpacity
                            // onPress={}
                            style={{...styles.btn, marginHorizontal:10, marginBottom:20}}
                        >
                            <Text style={styles.btnText}>Rate</Text>
                        </TouchableOpacity>
                      
                            
                        <TouchableOpacity
                            //  onPress={() => navigation.navigate('MarketProducts', { marketId: market.id })}
                            // onPress={() => navigate('MarketProducts')}
                            style={{...styles.btn_outline, marginHorizontal:10, marginBottom:20}}
                        >
                            <Text style={{...styles.btnText, color:'#1eb980'}}>View Products</Text>
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
        alignItems:'center',
        justifyContent:'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        
        borderRadius:20,
        elevation:20
    },
    body: {
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:30,
    },
    footer: {
        width: '100%',
        height:110,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
    },
    header: {
        width: '100%',
        height:60,
        alignItems:'flex-end',
        justifyContent:'center',
        backgroundColor:'#1eb980',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    }, 
    btn: {
        width: '35%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical:10,
        backgroundColor:'#1eb980'
    },
    btnText: {
        fontSize: 14,
        fontWeight: 'bold',
        color:'#fff'
    },
    btn_outline: {
        width: '40%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical:10,
        backgroundColor:'#fff',
        borderWidth: 1,
        borderColor: '#1eb980'
    }
})


function RatingView(numOfStars) {
  var stars=[]
    console.log("numOfStars in callout: ",numOfStars.numOfStars)
    if(numOfStars.numOfStars > 0) {
      for (let i = 0; i < numOfStars.numOfStars; i++) {
        stars.push(
          <Image 
            source={require('../../assets/star.png')} 
            resizeMode='contain'
            style={{width:19, height:19, marginRight:2}}
          />
        )        
      }
    }
    if(numOfStars.numOfStars != 5) {
      for (let i = 0; i < 5-numOfStars.numOfStars; i++) {
        stars.push(
          <Image 
            source={require('../../assets/star_outline.png')} 
            resizeMode='contain'
            style={{width:19, height:19,marginRight:2, tintColor:'#cbcbcb'}}
          />
        )
      }
    }
    console.log('Stars array length in callout: ', stars.length)
  return (
    <View style={{flexDirection:'row'}}>
      {stars}
    </View>
  )  
}