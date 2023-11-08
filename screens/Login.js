import React, { useState } from 'react';
import {
  Alert,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import {signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; 
import { useNavigation } from '@react-navigation/native';

const log = 'https://e7.pngegg.com/pngimages/708/311/png-clipart-icon-logo-twitter-logo-twitter-logo-blue-social-media-thumbnail.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert('Iniciaste sesión satisfactoriamente!!');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={styles.login}>
          <Image source={{ uri: log }} style={styles.log} />
          <Text style={styles.title}>Login </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder='pepitoPerez@ejemplo.com'
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder='***********'
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity onPress={signin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  log: {
    width: 100,
    height: 100,
    borderRadius: 90,
    borderWidth: 1,
    marginVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0096d2',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#00a6eb',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ffffff90',
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0096d2',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
});
