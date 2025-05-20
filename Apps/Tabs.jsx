import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

const QRButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.qrButtonContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.qrButton}>
        <MaterialCommunityIcons name="qrcode-scan" size={26} color="white" />
      </View>
    </TouchableOpacity>
  );
};

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home' 
            screenOptions={{ 
                tabBarStyle: {
                    height: 70,
                    borderTopWidth: .3,
                    paddingHorizontal: 0,
                    paddingTop: 5
                },
                tabBarActiveTintColor: '#B01C2E',
                tabBarInactiveTintColor: '#262626',
            }}
        >


        <Tab.Screen
            name="Home"
            component={LoginScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={26} color="#262626" />
            )
            }}
        />


        <Tab.Screen
            name="Analytics"
            component={RegisterScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={26} color="#262626" />                ),
            }}
        />

              <Tab.Screen
        name="QRScan"
        component={RegisterScreen}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <QRButton {...props} />
          ),
        }}
      />
    
        <Tab.Screen
            name="Services"
            component={RegisterScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" size={26} color="#262626" />
                ),
            }}
        />
    


        <Tab.Screen
            name="More"
            component={RegisterScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
<MaterialIcons name="more-horiz" size={26} color="#262626" />                ),
            }}
        />
    

    </Tab.Navigator>
)
}

const styles = StyleSheet.create({
  qrButtonContainer: {
    position: 'absolute',
    top: -40, 
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },

  qrButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#426bba', 
    justifyContent: 'center',
    alignItems: 'center',

  },
});


export default Tabs;