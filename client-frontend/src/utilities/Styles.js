import { StyleSheet, Platform, StatusBar } from 'react-native';
import { windowHeight, windowWidth } from '../utilities/Dimensions';

const height_logo = windowHeight * 0.45;
const width_logo = windowWidth * 0.45;

// Common screen app styles
export const CommonScreenStyles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth,
        height: windowHeight,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 

    },
    title: {
      fontSize: 28,
      marginTop: 10,
      marginBottom: windowHeight*0.07,
      color: '#000'
    },
    text: {
      fontSize: 24,
      marginBottom: 10,
      color: '#000'
    },
    navButton: {
      marginTop: 10,
      flexDirection: 'row'
    },
    navButtonText: {
      fontSize: 20,
      color: '#045d56'
    },
    navText: {
      fontSize: 20,
      color: '#000'
    }
});

// Form Button styles
export const FormButtonStyles = StyleSheet.create ({
    buttonContainer: {
        marginTop: 10,
        width: windowWidth / 2,
        height: windowHeight / 15,
        backgroundColor: '#1eb980',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
    fontSize: 28,
    color: '#ffffff'
    }
});

// Form Input styles
export const FormInputStyles = StyleSheet.create({
    input: {
      paddingHorizontal: 38,
      marginTop: 5,
      marginBottom: 10,
      width: windowWidth/1.5,
      height: windowHeight/15,
      fontSize: 16,
      borderRadius: 8,
      borderWidth: 1
    }
  });

// Bottom Navigation Tab Bar
export const BottomTabStyles = StyleSheet.create ({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 4
  }
});

// Splash screen styles
export const SplashScreenStyles = StyleSheet.create ({
  container: {
    flex: 1, 
    backgroundColor: '#1eb980'
  },
  header: {
      flex: 2.3,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 0.7,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: width_logo,
      height: height_logo,
      resizeMode:'contain'
  },
  title: {
      color: '#045d56',
      fontSize: 26,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  box: {
   
  },
});

// Home screen styles
export const HomeScreenStyles = StyleSheet.create ({
    
});

// Login screen styles
export const LoginScreenStyles = StyleSheet.create ({
  container: {
    flex: 1, 
    backgroundColor: '#1eb980'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: 0,
      paddingLeft: 10,
      color: '#05375a',
      fontSize:16
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});

// Login screen styles
export const ListStyles = StyleSheet.create ({
  itemWrapper: {
    width: windowWidth*0.95,
    flexDirection:'row',
    marginBottom: 10,
    padding:10,
    alignItems: 'center',
    backgroundColor: '#e6ecec'
  },
  image: {
    flex:0.7,
    width:80, 
    height:85, 
    borderRadius:80, 
    marginRight:20,
    marginLeft: 8
  },
  name: {
    fontSize: 20
  }    
});