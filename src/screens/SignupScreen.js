import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Keyboard,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, createRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

import auth from '@react-native-firebase/auth';
import {authentication} from './firebase/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {db} from './firebase/firebase';
import {doc, setDoc} from 'firebase/firestore/lite';

const SignupScreen = ({navigation}) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [phonefocus, setPhonefocus] = useState(false);
  const [namefocus, setNamefocus] = useState(false);
  const [showcpassword, setShowcpassword] = useState(false);
  const [confirmpasswordfocus, setConfirmpasswordfocus] = useState(false);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [errortext, setErrortext] = useState('');

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  // const handleSubmitButton = () => {
  //   setErrortext('');
  //   if (!userName) return Alert.alert('Please Fill Name');
  //   if (!userEmail) return Alert.alert('Please fill Email');
  //   if (!userPassword) return Alert.alert('Please fill Address');
  //   if (!userPhone) return Alert.alert('Please Fill your phone number');
  //   if (!userAddress) return Alert.alert('Please Fill address');

  //   auth()
  //     .createUserWithEmailAndPassword(userEmail, userPassword)
  //     .then(user => {
  //       console.log('Registration Sucessful.Please Login to Proceed');
  //       console.log(user);
  // if (user) {
  //   auth()
  //     .currentUser.updateProfile({
  //       displayName: userName,
  //       photoURL:
  //         'https://th.bing.com/th/id/OIP.JToyNeJb8GjikAQNW6NvEwHaIl?pid=ImgDet&rs=1',
  //     })
  //     .then(() => navigation.replace('Home'))
  //     .catch(error => {
  //       Alert.alert(error);
  //       console.error(error);
  //     });
  // }
  // })
  //     .catch(error => {
  //       console.log(error);
  //       if (error.code === 'auth/email-already-in-use') {
  //         setErrortext('That email is already in use!');
  //       } else {
  //         setErrortext(error.message);
  //       }
  //     });
  // };

  const RegisterUser = () => {
    setErrortext('');
    if (!userName) return Alert.alert('Please Fill Name');
    if (!userEmail) return Alert.alert('Please fill Email');
    // if (!userPassword) return Alert.alert('Please fill Address');
    // if (!userPhone) return Alert.alert('Please Fill your phone number');
    // if (!userAddress) return Alert.alert('Please Fill address');

    const dbName = Math.random().toString();

    createUserWithEmailAndPassword(authentication, userEmail, userPassword)
      .then(user => {
        console.log(user);
        setIsSignedIn(true);
        Alert.alert(' User Registration Sucessful. Please Login. ');
        if (!user == null) {
          auth().currentUser.updateProfile({
            displayName: userName,
            displayPhone: userPhone,
            displayEmail: userEmail,
            displayAddress: userAddress,
          });
        }
        navigation.navigate('Login');

        const name = userName;
        const email = userEmail;
        const phone = userPhone;
        const password = userPassword;
        const address = userAddress;
        setDoc(doc(db, 'name', dbName), {
          Name: name,
          Email: email,
          Phone: phone,
          Password: password,
          Address: address,
        });
      })
      .catch(re => {
        console.log(re);
        navigate.navigate('Login');
      });
  };

  return (
    // <ScrollView style={{backgroundColor: '#f0f8ff'}}>
    <View style={styles.container}>
      {/* <Text style={styles.head}>Sign Up</Text> */}
      <Image
        source={{
          uri: 'https://logowik.com/content/uploads/images/globe-tech.jpg',
          height: 150,
          width: 150,
        }}
      />

      <View style={styles.inputView}>
        <AntDesign
          style={{marginTop: 10, paddingLeft: 10}}
          name="user"
          size={24}
          color={namefocus === true ? 'red' : 'black'}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          // onChangeText={userName => setUserName(userName)}
          autoCapitalize="sentences"
          returnKeyType="next"
          // onSubmitEditing={() =>
          //   emailInputRef.current && emailInputRef.current.focus()
          // }
          blurOnSubmit={false}
          onFocus={() => {
            setNamefocus(true);
            setEmailfocus(false);
            setPasswordfocus(false);
            setShowpassword(false);
            setPhonefocus(false);
          }}
          onChangeText={userName => setUserName(userName)}
          value={userName}
        />
      </View>
      {/* {console.log('Line 157', userName)} */}
      <View style={styles.inputView}>
        <MaterialIcons
          style={{marginTop: 10, paddingLeft: 10}}
          name="email"
          size={24}
          color={emailfocus === true ? 'red' : 'black'}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          // onChangeText={userEmail => setUserEmail(userEmail)}
          keyboardType="email-address"
          // ref={emailInputRef}
          returnKeyType="next"
          // onSubmitEditing={() =>
          //   passwordInputRef.current && passwordInputRef.current.focus()
          // }
          blurOnSubmit={false}
          onFocus={() => {
            setNamefocus(false);
            setEmailfocus(true);
            setPhonefocus(false);
            setConfirmpasswordfocus(false);
            setPasswordfocus(false);
          }}
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
        />
      </View>

      {/* <View style={styles.inputView}>
          <AntDesign
            style={{marginTop: 10}}
            name="phone"
            size={24}
            color={phonefocus === true ? 'red' : 'black'}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            // onChangeText={userPhone => setUserPhone(userPhone)}
            blurOnSubmit={false}
            onFocus={() => {
              setNamefocus(false);
              setEmailfocus(false);
              setPhonefocus(true);
              setConfirmpasswordfocus(false);
              setPasswordfocus(false);
            }}
            value={userPhone}
            onChangeText={text => setUserPhone(text)}
          />
        </View> */}

      <View style={styles.inputView}>
        <MaterialIcons
          style={{marginTop: 10, paddingLeft: 10}}
          name="lock-outline"
          size={24}
          color={passwordfocus === true ? 'red' : 'black'}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          // onChangeText={userPassword => setUserPassword(userPassword)}
          // ref={passwordInputRef}
          returnKeyType="next"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          onFocus={() => {
            setNamefocus(false);
            setEmailfocus(false);
            setPhonefocus(false);
            setConfirmpasswordfocus(false);
            setPasswordfocus(true);
          }}
          value={userPassword}
          onChangeText={text => setUserPassword(text)}
          secureTextEntry={showpassword === false ? true : false}
        />
        <Octicons
          style={{marginTop: 10}}
          name={showpassword == false ? 'eye-closed' : 'eye'}
          size={24}
          color="black"
          onPress={() => {
            setShowpassword(!showpassword);
          }}
        />
      </View>

      {/* <Text style={styles.address}> Please Enter your Address</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Address"
            autoCapitalize="sentences"
            returnKeyType="next"
            // onSubmitEditing={() =>
            //   emailInputRef.current && emailInputRef.current.focus()
            // }
            blurOnSubmit={false}
            value={userAddress}
            onFocus={() => {
              setNamefocus(false);
              setEmailfocus(false);
              setPhonefocus(false);
              setConfirmpasswordfocus(false);
              setPasswordfocus(false);
            }}
            onChangeText={text => setUserAddress(text)}
          />
        </View> */}
      {/* {errortext != '' ? (
          <Text style={styles.errortext}> {errortext} </Text>
        ) : null} */}

      <TouchableOpacity style={styles.btn} onPress={RegisterUser}>
        <Text style={styles.buttontext}>Sign Up</Text>
      </TouchableOpacity>
      {/* <Text style={styles.or}>OR</Text>
        <Text style={styles.gftxt}>Sign In With</Text>
        <View style={styles.gf}>
          <TouchableOpacity>
            <View style={styles.gficon}>
              <AntDesign name="google" size={24} color="blue" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.gficon}>
              <Entypo name="facebook" size={24} color="blue" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.hr} /> */}
          <View style={styles.hr} />
      <Text
        style={{fontSize: 18, color: 'black'}}
        onPress={() => navigation.navigate('Login')}>
        Already have an Account?
        <Text style={styles.signup}> Login</Text>
      </Text>
    </View>
    // {/* </ScrollView> */}
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 40,
    backgroundColor: 'white',
  },
  head: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  inputView: {
    flexDirection: 'row',
    width: '85%',
    // height: '60',
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 20,
  },
  textinput: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 2,
    width: '80%',
  },
  or: {
    color: '#000000',
    marginTop: 10,
    fontSize: 18,
  },
  gftxt: {
    color: '#000000',
    marginVertical: 10,
    fontSize: 18,
  },
  gf: {
    flexDirection: 'row',
  },
  gficon: {
    backgroundColor: '#fff',
    width: 50,
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
  hr: {
    width: '80%',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginVertical: 20,
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
  buttontext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errortext: {color: 'red', textAlign: 'center', fontSize: 18},
});

export default SignupScreen;
