import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { List, TextInput, Button, RadioButton, Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons, FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';


const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);


  const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShowDatePicker(Platform.OS === 'ios');
  setDate(currentDate);
};

  const genders = [
    { id: '1', name: 'Male' },
    { id: '2', name: 'Female' },
    { id: '3', name: 'Other' },
    { id: '4', name: 'Prefer not to say' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.row1}>
              <Image
                source={require('../assets/images/otsuka-logo.png')}
                style={styles.logo}
              />
              <Text style={styles.subtitle}>
                Otsuka People creating new products for better health worldwide.
              </Text>
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                label="Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.inputBox}
                outlineColor="#426bba"
                left={<TextInput.Icon icon="account" color="#426bba" />}
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
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.inputBox}
                outlineColor="#426bba"
                left={<TextInput.Icon icon="email" color="#426bba" />}
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
                left={<TextInput.Icon icon="lock" color="#426bba" />}
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

              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                outlineColor="#426bba"
                secureTextEntry={!showConfirmPassword}
                style={styles.inputBox}
                left={<TextInput.Icon icon="lock" color="#426bba" />}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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

              <View style={styles.row2}>
                 <View style={styles.col1}>        
                <Text style={styles.radioGroupLabel}>Gender</Text>
                <View style={styles.radioButtonsRow}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton.Android
                      value="male"
                      status={gender === 'male' ? 'checked' : 'unchecked'}
                      onPress={() => setGender('male')}
                      color="#426bba"
                    />
                    <Text style={styles.radioLabel}>Male</Text>
                  </View>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton.Android
                      value="female"
                      status={gender === 'female' ? 'checked' : 'unchecked'}
                      onPress={() => setGender('female')}
                      color="#426bba"
                    />
                    <Text style={styles.radioLabel}>Female</Text>
                  </View>
                  </View>
                </View>  

                <View style={styles.col}>        
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
                )}

                <TouchableOpacity 
                  style={styles.datePickerButton} 
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.datePickerButtonText}>Birthdate</Text>
                  <AntDesign name="calendar" size={24} color="#999" />
                </TouchableOpacity>


               </View>

              </View> 



         
            
             
              <Button
                mode="contained"
                onPress={() => console.log('Register pressed')}
                style={styles.registerButton}
                contentStyle={{ height: 50 }}
                theme={{
                  colors: {
                    primary: '#426bba',
                    onPrimary: '#fff',
                  },
                }}
              >
                Register
              </Button>
               <View style={styles.termsContainer}>
  <Checkbox.Android
    status={termsAccepted ? 'checked' : 'unchecked'}
    onPress={() => setTermsAccepted(!termsAccepted)}
    color="#426bba"
  />
  <View style={styles.termsTextContainer}>
    <Text style={styles.termsText}>
      I agree to the{' '}
      <Text 
        style={styles.termsLink}
        onPress={() => console.log('Terms and Conditions pressed')}
      >
        Terms and Conditions
      </Text>
      {' '}and{' '}
      <Text 
        style={styles.termsLink}
        onPress={() => console.log('Privacy Policy pressed')}
      >
        Privacy Policy
      </Text>
    </Text>
  </View>
</View>
              <TouchableOpacity onPress={() => console.log('Navigate to login')}>
                <Text style={styles.loginText}>
                  Already have an account? Log in
                </Text>
              </TouchableOpacity>
            </View>


          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  row1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginHorizontal: 20,
  },

row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
},


  subtitle: {
    fontSize: 16,
    color: '#999',
    marginTop: 25,
    textAlign: 'center',
  },
  inputContainer: {
    width: '85%', // Slightly increased from 75%
    justifyContent: 'space-between',
  },
  inputBox: {
    marginBottom: 15,
    backgroundColor: '#fff', // Changed from transparent
    height: 50,
  },
    genderDatePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    },

  registerButton: {
    backgroundColor: '#426bba',
    borderRadius: 55,
    height: 50,
    marginTop: 10,
    width: '100%', // Added full width
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10, // Added some margin
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  line: {
    width: '10%',
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  orText: {
    color: '#999',
  },
  loginText: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
    alignSelf: 'center',
  },

  radioGroupContainer: {
    width: '100%',
    borderRadius: 5,
  },

  col: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
  col1: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'

  },

  radioGroupLabel: {
    fontSize: 16,
    color: '#3f3f3f',
    alignSelf: 'flex-start',    
  },
  radioButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: -8,
    
  },
  radioLabel: {
    color: '#3f3f3f',
    fontSize: 14,
  },

//   date picker

  datePickerButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 12,
  borderWidth: 1,
  borderColor: '#426bba',
  borderRadius: 5,
  },
datePickerButtonText: {
  fontSize: 16,
  color: '#3f3f3f',
  marginRight: 15,
},

// terms and condition
termsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
},
termsTextContainer: {
  flex: 1,
  marginLeft: 5,
},
termsText: {
  fontSize: 14,
  color: '#3f3f3f',
},
termsLink: {
  color: '#426bba',
  textDecorationLine: 'underline',
},

});

export default RegisterScreen;