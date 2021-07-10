import { StyleSheet, Platform, StatusBar } from 'react-native'
import { windowHeight, windowWidth } from '../utilities/Dimensions'
import { BBThemeColor } from '../utilities/Colors'

const height_logo = windowHeight * 0.45
const width_logo = windowWidth * 0.45

export const CommonScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: windowHeight * 0.07,
    color: '#000',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    color: '#000',
  },
  navButton: {
    marginTop: 10,
    flexDirection: 'row',
  },
  navButtonText: {
    fontSize: 20,
    color: '#045d56',
  },
  navText: {
    fontSize: 20,
    color: '#000',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
})

export const FormButtonStyles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: windowWidth / 2,
    height: windowHeight / 15,
    backgroundColor: BBThemeColor,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 28,
    color: '#fff',
  },
})

export const FormInputStyles = StyleSheet.create({
  input: {
    paddingHorizontal: 38,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
})

export const BottomTabStyles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 2,
  },
})

export const SplashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BBThemeColor,
  },
  header: {
    flex: 2.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  logo: {
    width: width_logo,
    height: height_logo,
    resizeMode: 'contain',
  },
  title: {
    color: '#045d56',
    fontSize: 26,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  box: {},
})

export const MapStyles = StyleSheet.create({
  map: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: 'transparent',
    borderWidth: 0,
    padding: 15,
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: BBThemeColor,
    borderWidth: 0,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 0,
    alignSelf: 'center',
    marginTop: -32,
  },
  image: {
    width: 120,
    height: 80,
  },
})

export const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BBThemeColor,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  text_validation: {
    color: '#cf4332',
    fontSize: 12,
    marginTop: 5,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ff0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 16,
  },
  errorMsg: {
    color: '#ff0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export const ListStyles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: windowWidth,
    height: windowHeight - 65,
    marginHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 180,
  },
  itemWrapper: {
    width: windowWidth * 0.92,
    marginVertical: 3,
  },
  mainItemWrapper: {
    width: windowWidth * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    alignContent: 'center',
    textAlign: 'center',
    borderColor: BBThemeColor,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  listWidth: {
    width: windowWidth * 0.92,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 20,
    marginLeft: 8,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  text: {
    fontSize: 20,
  },
})
