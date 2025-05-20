import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

// Create tab navigator
const Tab = createBottomTabNavigator();

// Dashboard Screen Component
const DashboardScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/otsuka-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome, Admin</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Today's Tasks</Title>
              <Paragraph>You have 3 pending tasks</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="text" 
                color="#426bba"
                onPress={() => console.log('View tasks')}
              >
                View All
              </Button>
            </Card.Actions>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Recent Activities</Title>
              <Paragraph>Last login: Today, 10:30 AM</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="text" 
                color="#426bba"
                onPress={() => console.log('View activities')}
              >
                Details
              </Button>
            </Card.Actions>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Announcements</Title>
              <Paragraph>New product launch next week</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="text" 
                color="#426bba"
                onPress={() => console.log('View announcements')}
              >
                Read More
              </Button>
            </Card.Actions>
          </Card>
        </View>
        <Card style={[styles.card, styles.nfcCard]}>
            <Card.Content style={styles.nfcCardContent}>
                <MaterialCommunityIcons name="nfc" size={40} color="#fff" />
                <Title style={styles.nfcCardTitle}>NFC Scanner</Title>
                <Paragraph style={styles.nfcCardText}>Scan NFC tags using your device's camera</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.nfcCardActions}>
                <Button 
                mode="contained" 
                style={styles.nfcButton}
                onPress={() => navigation.navigate('NFCScreen')}
                >
                Start Scanning
                </Button>
            </Card.Actions>
            </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

// Profile Screen Component
const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <MaterialCommunityIcons name="account-circle" size={100} color="#426bba" />
        </View>
        <Text style={styles.profileName}>Admin User</Text>
        <Text style={styles.profileEmail}>admin@otsuka.com</Text>
      </View>
      
      <View style={styles.profileInfoContainer}>
        <Card style={styles.profileCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Personal Information</Title>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name:</Text>
              <Text style={styles.infoValue}>Admin User</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>admin@otsuka.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Role:</Text>
              <Text style={styles.infoValue}>Administrator</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Department:</Text>
              <Text style={styles.infoValue}>IT Department</Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              style={styles.editButton}
              onPress={() => console.log('Edit profile')}
            >
              Edit Profile
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
};

// Settings Screen Component
const SettingsScreen = () => {
  // Add useNavigation hook to get access to navigation
  const navigation = useNavigation();
  
  // Function to handle logout
  const handleLogout = () => {
    // Navigate to Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.settingsTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.settingsContainer}>
          <Card style={styles.settingsCard}>
            <Card.Content>
              <Title style={styles.cardTitle}>Account Settings</Title>
              <View style={styles.settingsItem}>
                <MaterialCommunityIcons name="account-edit" size={24} color="#426bba" />
                <Text style={styles.settingsText}>Edit Profile</Text>
              </View>
              <View style={styles.settingsItem}>
                <MaterialCommunityIcons name="lock-reset" size={24} color="#426bba" />
                <Text style={styles.settingsText}>Change Password</Text>
              </View>
              <View style={styles.settingsItem}>
                <MaterialCommunityIcons name="bell-outline" size={24} color="#426bba" />
                <Text style={styles.settingsText}>Notification Settings</Text>
              </View>
            </Card.Content>
          </Card>
          
          <Card style={styles.settingsCard}>
            <Card.Content>
              <Title style={styles.cardTitle}>App Settings</Title>
              <View style={styles.settingsItem}>
                <MaterialCommunityIcons name="theme-light-dark" size={24} color="#426bba" />
                <Text style={styles.settingsText}>Theme</Text>
              </View>
              <View style={styles.settingsItem}>
                <MaterialCommunityIcons name="translate" size={24} color="#426bba" />
                <Text style={styles.settingsText}>Language</Text>
              </View>
              <View style={styles.settingsItem}>
                <MaterialCommunityIcons name="information-outline" size={24} color="#426bba" />
                <Text style={styles.settingsText}>About</Text>
              </View>
            </Card.Content>
          </Card>
          
          <Button 
            mode="contained" 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            Logout
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Main HomeScreen component with bottom tabs
const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#426bba',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#426bba',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  cardContainer: {
    marginTop: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    color: '#426bba',
    fontWeight: 'bold',
  },
  // Profile styles
  profileHeader: {
    backgroundColor: '#426bba',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImageContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    marginBottom: 10,
  },
  profileName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    opacity: 0.8,
  },
  profileInfoContainer: {
    padding: 15,
  },
  profileCard: {
    borderRadius: 10,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  infoLabel: {
    width: '40%',
    color: '#666',
    fontSize: 16,
  },
  infoValue: {
    width: '60%',
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#426bba',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 25,
  },
  // Settings styles
  settingsTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsContainer: {
    marginTop: 10,
  },
  settingsCard: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 25,
  },
  nfcCard: {
  backgroundColor: '#426bba',
  marginTop: 20,
  marginBottom: 30,
    },
    nfcCardContent: {
    alignItems: 'center',
    paddingVertical: 20,
    },
    nfcCardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 10,
    },
    nfcCardText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    },
    nfcCardActions: {
    justifyContent: 'center',
    paddingBottom: 20,
    },
    nfcButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    },
});

export default HomeScreen;
