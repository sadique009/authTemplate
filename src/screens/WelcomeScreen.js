import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import applogo from '../../assets/applogo.png';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to App Name</Text>
      <View style={styles.logo}>
        <Image source={applogo} style={styles.applogo} />
      </View>
      <View style={styles.hr80} />
      <Text style={styles.text}>App Description</Text>
      <View style={styles.hr80} />
      <View style={styles.btnout}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 2,
    marginVertical: 10,
  },
  logo: {
    width: '80%',
    height: '30%',
    alignItems: 'center',
  },
  applogo: {
    width: '80%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    width: '80%',
    textAlign: 'center',
    fontWeight: '700',
  },
  hr80: {
    width: '80%',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  btnout: {
    flexDirection: 'row',
  },
  btn: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: '700',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default WelcomeScreen;
