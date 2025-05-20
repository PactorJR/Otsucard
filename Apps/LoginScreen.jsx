import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('admin'); // Default username
  const [password, setPassword] = useState('123'); // Default password
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();

  // Add keyboard listeners to detect when keyboard is shown/hidden
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = () => {
    // Check if credentials match the default ones
    if (email === 'admin' && password === '123') {
      // Clear any previous error
      setError('');
      // Navigate to HomeScreen
      navigation.navigate('HomeScreen');
    } else {
      // Show error message for invalid credentials
      setError('Invalid username or password');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.row1}>
              <Image
                source={require('../assets/images/otsuka-logo.png')}
                style={styles.logo}
              />
              <Text style={styles.tagline}>
                Otsuka People creating new products for better health worldwide.
              </Text>
            </View>
            
            <View style={styles.inputContainer}>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.inputBox}
                outlineColor="#426bba"
                left={<TextInput.Icon icon="email" color="#262626" />}
                theme={{
                  colors: {
                    primary: '#426bba',
                    background: '#fff',
                    text: '#000',
                    placeholder: '#999',
                  },
                }}
              />
              
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                outlineColor="#426bba"
                secureTextEntry={!showPassword}
                style={styles.inputBox}
                left={<TextInput.Icon icon="lock" color="#262626" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                    color="#adadad"
                  />
                }
                theme={{
                  colors: {
                    primary: '#426bba',
                    background: '#fff',
                    text: '#000',
                    placeholder: '#999',
                  },
                }}
              />
              <TouchableOpacity onPress={() => console.log('Navigate to forgot password screen')}>
                <Text style={styles.forgotPassword}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              
              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.loginButton}
                contentStyle={{ height: 50 }}
                theme={{
                  colors: {
                    primary: '#426bba',
                    onPrimary: '#fff',
                  },
                }}
              > Log In </Button>
              <TouchableOpacity onPress={() => console.log('Dont have an account?')}>
                <Text style={styles.noAccount}>
                  Don't have an account?
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>
          </View>
          
          {/* Blue bottom section with register button */}
          <View style={[styles.row2, keyboardVisible && styles.hiddenRow2]}>
            <Button
              mode="contained"
              onPress={() => console.log('Pressed')}
              style={styles.registerButton}
              contentStyle={{ height: 50 }}
              theme={{
                colors: {
                  primary: '#fff',
                  onPrimary: '#426bba',
                },
              }}
            > Register</Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 130,
  },
  row1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 16,
    color: '#999',
    marginTop: 25,
    alignContent: 'center',
    textAlign: 'center'
  },
  inputContainer: {
    width: '75%',
    justifyContent: 'space-between',
  },
  inputBox: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    height: 50,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#999',
    marginTop: -10,
    alignSelf: 'flex-end',
    marginBottom: 10
  },
  loginButton: {
    backgroundColor: '#426bba',
    borderRadius: 55,
    height: 50,
  },
  noAccount: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
    alignSelf: 'center'
  },
  registerButton: {
    backgroundColor: '#fff',
    borderRadius: 55,
    height: 50,
    width: '75%',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10
  },
  row2: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#426bba',
    width: '100%',
    height: 250,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: 'absolute',
    bottom: 0,
  },
  hiddenRow2: {
    display: 'none', // Hide the blue section when keyboard is visible
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  line: {
    width: '10%',
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  orText: {
    color: '#999',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default LoginScreen;
