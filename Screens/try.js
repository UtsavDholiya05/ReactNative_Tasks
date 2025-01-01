import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from "../Context/axiosConfig";


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    setEmail(email);
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    setPassword(password);
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async () => {
    validateEmail(email);
    validatePassword(password);
  
    if (emailError || passwordError || !email || !password) {
      return;
    }
  
    setLoading(true);
  
    // Debug: Log axiosInstance to ensure it's correctly imported and defined
    console.log('axiosInstance:', axiosInstance);
  
    try {
      const response = await axiosInstance.post('/login', { email, password });
      const { token } = response.data;
      
      // Save JWT token to AsyncStorage
      await AsyncStorage.setItem('jwt_token', token);
      navigation.navigate('Home'); // Navigate to the Home screen
    } catch (error) {
      console.log('Login Error:', error.message, error.response?.data || 'No additional data available.');
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle the password visibility
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ImageBackground
        source={require('../t/WhatsApp Image 2024-09-28 at 21.29.25_158d91f3.jpg')}
        style={{ height: '100%', width: '100%' }}
      >
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your Email address"
          keyboardType="email-address"
          onChangeText={validateEmail}
          value={email}
        />

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input1}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            onChangeText={validatePassword}
            value={password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>

        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonTO}
          onPress={handleSubmit}
          disabled={!email || !password || !!emailError || !!passwordError}
        >
          {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.signupLink}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
    marginTop: 50,
  },
  subtitle: {
    color: '#D5F2E3',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 37,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 100,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 100,
    justifyContent: 'space-between',
  },
  input1: {
    flex: 1,
  },
  iconStyle: {
    fontSize: 22,
    color: 'black',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    paddingRight: 16,
    marginBottom: 150,
  },
  forgotPasswordText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonTO: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderRadius: 15,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  signupLink: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 3,
    marginVertical: 20,
  },
});
