import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
const Splash = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.replace(auth().currentUser ? 'Home' : 'Welcome');
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/applogo.png')}
          style={styles.imagestyle}
        />
        <ActivityIndicator
          animating={animating}
          color="#ffffff"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
      <Text style={styles.text1}>Welcome to the Application Name</Text>
      <Text style={styles.text2}>App Descriptions</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagestyle: {
    width: '90%',
    resizeMode: 'contain',
    margin: 30,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  text1: {
    fontSize: 18,
    textAlign: 'center',
  },
  text2: {
    fontSize: 18,
    textAlign: 'center',
  },
});
export default Splash;
