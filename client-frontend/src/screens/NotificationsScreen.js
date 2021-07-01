import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Animated, StatusBar, Image, FlatList} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {firebaseConfig} from '../utilities/config';
import firebase from 'firebase';
require('firebase/firestore');
import axios from 'axios'

export default function NotificationsScreen({navigation}) {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); 
  }

  const db = firebase.firestore();

  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState({});
  const { token } = useContext(AuthContext);


  useEffect(() => {
    db
    .collection('notifications')
    .onSnapshot(collection => {
      db
      .collection('notifications')
      .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
        let msgs = snapshot.docs.map((doc, index) => ({
          barcode: doc.data().barcode,
          createdAt: doc.data().createdAt.toDate(),
          details: doc.data().details,
          title: doc.data().title,
        }))
        setMessages(msgs)


      })
    });
  
  }, [])

  useEffect(() => {
    messages && fetchAllProducts();
  }, [messages])

  useEffect(() => {
    console.log('/////Products', products);
  }, [products])

  const fetchAllProducts = () => {
    axios.get(`http://192.168.43.152:8000/api/allProducts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }})
    .then(response => {        
      let items_temp = {};
      for(let i=0; i<response.data.products.length; i++){
        items_temp[response.data.products[i].barcode] = response.data.products[i];
      }
      console.log('After for loop', items_temp);
      setProducts(items_temp);
      return
    })
    .catch(err => {
    console.log('The Error: ', err)      
    })   
  }




  const fetchProduct = (barcode) => {
    console.log('fetch')
      axios.get(`http://192.168.43.152:8000/api/product/${barcode}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }})
    .then(response => { 
      if(response.data.product) {
        // setProduct(response.data.product)
      }
    })
    .catch(err => {
      // alert('Scan again')
      // setFailed(true) 
      console.log('Fetch Product Error: ', err)      
    })
    return data;   
  } 
 
  return (
    <View style={{flex:1, top:100, left:100}}>
  <FlatList
    horizontal={false}
    data={messages}
    keyExtractor={(item) => JSON.stringify(item.createdAt)}
    renderItem={({item}) => ((
      <>
      {console.log('item----------', item)}
        { products &&
        <TouchableOpacity           
            onPress={() => {              
              navigation.navigate('ProductStack', {screen: 'ProductMarkets', params: {product: products[item.barcode]}})

            }}>
                
                <View style={styles.convBoxLeft}>
                    <Image
                        style={styles.postPhoto} 
                        source={{uri: products[item.barcode].image}} 
                        />
                </View>

                <View style={styles.convBoxRight}>

                    <Text style={styles.topMessageAdoption}>
                      {item.title}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.messageSeenText}>
                           {/* {messageFormat(item.details)} */}
                        </Text> 
                    </View>


                  </View>

                  <Text style={styles.adoptionTime}>
                  {/* {timeFormat(item.createdAt)} */}
                    </Text>


        </TouchableOpacity>
    }
        </>
    ))} />
</View>
  );
}


const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  name:{
    fontSize:16,
    color:"#1eb980"
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 2,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    // alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    // borderRadius: 15,
  },
  backRightBtn: {
    // alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right:0,
    width:60,
    borderRadius:40
    // paddingRight: 17,
  },
  backRightBtnLeft: {
    height:90,
    width:60,
    backgroundColor: '#1eb980',
    right: -227,
    borderRadius:10

  },
  backRightBtnRight: {
    height:90,
    width:60,
    backgroundColor: '#cf4332',
    right: -228,
    borderRadius:10

    // borderTopRightRadius: 5,
    // borderBottomRightRadius: 5,
  },
  trash: {
    height: 27,
    width: 27,
    right:-16,
    top:30

  },




  backgroundContainer: {
    flex: 1,
    marginTop: 25,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
},
adoptionBox: {
    height: 105,
    width: '100%',
    paddingHorizontal: 7,
    // paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderBottomColor: 'red',
    backgroundColor: 'yellow'
},
bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    width: '100%',
    height: 60
},
convBoxLeft: {
    marginRight: 10,
    bottom: 10
},
convBoxRight: {
    bottom: 10
},
convBox: {
    height: 85,
    width: '100%',
    paddingHorizontal: 7,
    // paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderBottomColor: 'blue',
    backgroundColor: 'white'
},
list: {
    flex: 1,
    width: '100%',
    // marginBottom: 20,
},
topMessageComment: {
    fontSize: 15,
    marginBottom: 3,
},
topMessageAdoption: {
    fontSize: 15,
    marginTop: 25,
    marginBottom: 3,
},
messageSeenText: {
    fontSize: 14,
    fontStyle: 'italic',
},
adoptionTime: {
    fontSize: 11,
    width: 100,
    left: 187,
    top: 95,
    position: 'absolute',
},
commentTime: {
    fontSize: 11,
    width: 100,
    left: 187,
    top: 53,
    position: 'absolute',
},
topBar: {
    height: 50,
    width: '100%',
    paddingLeft: 15,
    // justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: 'pink',
    flexDirection: 'row'
},
topBarText: {
    fontSize: 19
},
postPhoto: {
    aspectRatio: 1,
    width: 50,
    borderRadius: 10
}
}); 