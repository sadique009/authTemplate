import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';

//Firebase Import
import {authentication} from './firebase/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

//Icon imports
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const LoginScreen = ({navigation}) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordFocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  // const handleSubmitPress = () => {
  //   setErrortext('');
  //   if (!userEmail) {
  //     Alert.alert('Please Fill Email');
  //     return;
  //   }
  //   if (!userPassword) {
  //     Alert.alert('Please fill Password');
  //     return;
  //   }
  //   auth()
  //     .signInWithEmailAndPassword(userEmail, userPassword)
  //     .then(user => {
  //       console.log(user);
  //       //I server response message same as data Matched
  //       if (user) navigation.replace('Home');
  //     })
  //     .catch(error => {
  //       console.log('Login Screen Line 54', error);
  //       if (error.code === 'auth/invalid-email') setErrortext(error.message);
  //       else if (error.code === 'auth/user-not-found')
  //         setErrortext('No User Found');
  //       else {
  //         setErrortext('Please Check your email id or password');
  //       }
  //     });
  // };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Line 12 User Info ', userInfo);
      const data1 = userInfo.user;
      //console.log(userInfo.user.email);
      navigation.navigate('Home', {data1});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('line 38', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('line 41', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('line 44', error);
      } else {
        // some other error happened
        console.log('line 47', error);
      }
    }
  };

  const SignInUser = () => {
    setErrortext('');
    if (!userEmail) {
      Alert.alert('Please enter your email address.');
      return;
    }
    if (!userPassword) {
      Alert.alert('Please enter your password.');
      return;
    }

    signInWithEmailAndPassword(authentication, userEmail, userPassword)
      .then(user => {
        setIsSignedIn(true);
        const data = user._tokenResponse;
        console.log('line 110', data);
        console.log('Line 111', data.email);
        Alert.alert(`Welcome ${data.email}`);
        navigation.navigate('Home', {data});
      })
      .catch(re => {
        console.log('line 115', re);
      });
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.head}>Sign In</Text> */}
      <Image
        source={{
          uri: 'https://logowik.com/content/uploads/images/globe-tech.jpg',
          height: 150,
          width: 150,
        }}
      />

      <View style={styles.inputtext}>
        <AntDesign
          style={{marginTop: 10, paddingLeft: 10}}
          name="user"
          size={24}
          color={emailfocus === true ? 'red' : 'black'}
        />
        <TextInput
          placeholder="Email/ UserID"
          style={styles.input}
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
          // onChangeText={userEmail => setUserEmail(userEmail)}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          // onSubmitEditing={() =>
          //   passwordInputRef.current && passwordInputRef.current.focus()
          // }
          //underlineColorAndroid="#f00000"
          blurOnSubmit={false}
          onFocus={() => {
            setEmailfocus(true);
            setPasswordFocus(false);
            setShowpassword(false);
          }}
        />
      </View>
      <View style={styles.inputtext}>
        <MaterialIcon
          name="lock-outline"
          size={24}
          style={{marginTop: 10, paddingLeft: 10}}
          color={passwordfocus === true ? 'red' : 'black'}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={userPassword}
          onChangeText={text => setUserPassword(text)}
          // onChangeText={userPassword => setUserPassword(userPassword)}
          onFocus={() => {
            setEmailfocus(false);
            setPasswordFocus(true);
          }}
          keyboardType="default"
          // ref={passwordInputRef}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          returnKeyType="next"
          secureTextEntry={showpassword === false ? true : false}
        />
        <Octicons
          name={showpassword == false ? 'eye-closed' : 'eye'}
          style={{marginTop: 10}}
          size={24}
          onPress={() => setShowpassword(!showpassword)}
          color={showpassword == false ? 'black' : 'red'}
        />
      </View>
      {errortext != '' ? (
        <Text style={styles.errorText}> {errortext} </Text>
      ) : null}
      <TouchableOpacity style={styles.btn} onPress={SignInUser}>
        <Text style={styles.buttontext}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.fpassword}>Forgot Password?</Text>
      <Text style={styles.or}>or</Text>
      {/* <Text style={styles.gftxt}>Sign In With</Text> */}

      {/* <View style={styles.gf}> */}
      {/* <View style={styles.gificon}> */}

      <TouchableOpacity style={styles.btn1} onPress={googleLogin}>
        {/* <AntDesign name="google" size={24} color="blue" /> */}
        {/* <Image
          source={{
            uri: 'https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-White-Dark-Background-Logo.wine.svg',
            height: 10,
            width: 10,
          }}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            width: '70%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Ionicons name="logo-google" size={26} color="white" />
          <Text style={styles.buttontext1}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>

      {/* </View> */}

      {/* <View style={styles.gificon}> */}
      <TouchableOpacity style={styles.btn2} onPress={googleLogin}>
        {/* <AntDesign name="google" size={24} color="blue" /> */}

        {/* <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmwQboe39aRHktN3SFyumLBDvf387LeRMFA&usqp=CAU',
            height: 10,
            width: 10,
          }}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            width: '70%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <FontAwesome name="facebook-f" size={26} color="white" />

          <Text style={styles.buttontext1}>Sign in with Facebook</Text>
        </View>
      </TouchableOpacity>
      {/* </View> */}

      {/* <TouchableOpacity>
          <View style={styles.gificon}>
            <Entypo name="facebook" size={24} color="blue" />
          </View>
        </TouchableOpacity> */}
      {/* </View> */}
      <View style={styles.hr} />
      <Text
        style={{fontSize: 18, color: 'black'}}
        onPress={() => navigation.navigate('Signup')}>
        Don't have an Account?
        <Text style={[styles.signup, {fontSize: 18}]}> Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputtext: {
    flexDirection: 'row',
    width: '85%',
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
  },
  btn: {
    marginVertical: 10,
    width: '85%',
    height: 60,
    backgroundColor: 'black',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'white',
  },
  btn1: {
    marginVertical: 10,
    width: '85%',
    height: 60,
    backgroundColor: '#EB6440',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'white',
  },
  btn2: {
    marginVertical: 10,
    width: '85%',
    height: 60,
    backgroundColor: '#205295',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'white',
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttontext1: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fpassword: {
    color: 'black',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  or: {
    color: '#000000',
    margin: 10,
    fontSize: 18,
  },
  gftxt: {
    color: '#000000',
    marginVertical: 10,
    fontSize: 18,
  },
  gf: {
    // flexDirection: 'row',
  },
  gificon: {
    backgroundColor: '#fff',
    width: 250,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 10,
  },
  hr: {
    width: '80%',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  signup: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    alignContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default LoginScreen;
