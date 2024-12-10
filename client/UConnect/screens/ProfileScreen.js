// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import { registerUser, loginUser } from '../services/user.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';


export default function ProfileScreen() {
  const { colors } = useTheme();
  
  // State to toggle between Login and Register
  const [isRegister, setIsRegister] = useState(false);
  
  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      const token = await registerUser(username, email, password);
      await AsyncStorage.setItem('token', token);
      Alert.alert('Success', 'Registration successful!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const token = await loginUser(email, password);
      // Save token
      await AsyncStorage.setItem('token', token);
      setIsAuthenticated(true);
      Alert.alert('Success', 'Login successful!');
      const decoded = jwtDecode(token);
      console.log(decoded);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (isRegister) {
      // Simple validation
      if (!username || !email || !password) {
        setError('Please fill all fields');
        return;
      }
      handleRegister();
    } else {
      if (!email || !password) {
        setError('Please fill all fields');
        return;
      }
      handleLogin();
    }
  };

  if (isAuthenticated) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Username
        </Text>
        {/* Blank Screen */}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text, fontSize: 24, marginBottom: 20 }}>
        {isRegister ? 'Register' : 'Login'}
      </Text>

      {isRegister && (
        <TextInput
          style={[styles.input, { borderColor: "gray", color: colors.text }]}
          placeholder="Username"
          placeholderTextColor={"gray"}
          value={username}
          onChangeText={setUsername}
        />
      )}

      <TextInput
        style={[styles.input, { borderColor: "gray", color: colors.text }]}
        placeholder="Email"
        placeholderTextColor={"gray"}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, { borderColor: "gray", color: colors.text }]}
        placeholder="Password"
        placeholderTextColor={"gray"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{isRegister ? 'Register' : 'Login'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { setIsRegister(!isRegister); setError(''); }}>
        <Text style={{ color: colors.text, marginTop: 20 }}>
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
