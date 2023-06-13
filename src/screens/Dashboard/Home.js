import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

import {firebase} from '../firebase/firebase';

const Home = ({navigation, route}) => {
  const userInfo = route.params.data;
  const userInfo1 = route.params.data1;
  //console.log('line 09', userInfo.email);
  const [user, setUser] = useState();
  const dataRef = firebase.firestore().collection('name');

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(user => {
  //     console.log('User Line 13', JSON.stringify(user));
  //     setUser(user);
  //   });
  //   return subscriber;
  // }, []);

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            auth()
              .signOut()
              .then(() => navigation.replace('Login'))
              .catch(error => {
                console.log(error);
                if (error.code === 'auth/no-current-user')
                  navigation.replace('Login');
                else Alert.alert(error);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View>
      {userInfo ? (
        <View style={styles.textStyle}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Hii there... {userInfo.email}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Hii there...{userInfo.displayName}
          </Text>
        </View>
      ) : (
        <View>
          <Text>Hii there... {userInfo1.email}</Text>
          <Text>Hii there... {userInfo1.givenName}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={logout}>
        <Text style={styles.buttonTextStyle}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 300,
    backgroundColor: 'black',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: 'black',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  textStyle: {
    alignItems: 'center',
    marginTop: 40,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Home;
