import React from 'react';
import { TouchableOpacity, Text, Image, View, Modal, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


export default function BarcodeScannerModal({product, visibility, setVisibility, setScanned, setProduct, navigation}) {
    console.log('modal',product)    

  return (
    <Modal animationType='slide' visible={visibility} transparent={true} >
      <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <Feather
                name='x'
                size={19}
                color='#000'
                style={{top:13, right:10, position:'absolute'}}
                onPress={()=> {
                  setScanned(false) 
                  setVisibility(false)}}
            />
           <View style={{alignItems:'center' }}>                     
            <Image
              source={{uri:product.image}} 
              resizeMode='contain'
              style={{marginTop:10, height:160, width:160}}
            />   
              <Text style={{ color:'#000', fontSize:18, fontWeight:'bold'}}>{product.brand}</Text>
          
              <Text style={{marginTop:4, fontSize:15}}>{product.category}</Text>

              <Text style={{marginTop:4, fontSize:15}}>{product.size + ' ' + product.unit}</Text>   
            </View>
          
            <TouchableOpacity
              activeOpacity={1}
                onPress={() => {               
                  navigation.navigate('ProductStack', {screen: 'ProductMarkets', params: {product:product}})}}
                style={{...styles.btn, marginVertical:20, alignSelf:'center'}}
            >
                <Text style={{...styles.btnText, color:'#fff'}}>View Prices</Text>
            </TouchableOpacity>
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
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'center',
        backgroundColor:'#1eb980',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    }, 
    btn: {
        width: '40%',
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
    },
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