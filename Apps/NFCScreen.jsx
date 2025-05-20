import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
  Linking
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

const NFCScreen = () => {
  const [hasNfc, setHasNfc] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [nfcData, setNfcData] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Initialize NFC manager
  useEffect(() => {
    const checkNfc = async () => {
      try {
        // Initialize NFC Manager
        await NfcManager.start();
        
        // Check if NFC is supported
        const supported = await NfcManager.isSupported();
        setHasNfc(supported);
        
        if (!supported) {
          Alert.alert(
            'NFC Not Supported',
            'This device does not support NFC functionality.',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Error initializing NFC:', error);
        setHasNfc(false);
        Alert.alert(
          'NFC Error',
          'There was an error initializing NFC. Please try again.',
          [{ text: 'OK' }]
        );
      }
    };
    
    checkNfc();
    
    // Clean up when component unmounts
    return () => {
      cleanUpNfc();
    };
  }, []);

  // Clean up NFC resources when screen loses focus
  useEffect(() => {
    if (!isFocused) {
      cleanUpNfc();
    }
  }, [isFocused]);

  const cleanUpNfc = async () => {
    try {
      setScanning(false);
      // Cancel any ongoing NFC operations
      await NfcManager.cancelTechnologyRequest();
    } catch (error) {
      console.error('Error cleaning up NFC:', error);
    }
  };

  const startScanning = async () => {
    try {
      setScanning(true);
      setScanned(false);
      setNfcData(null);
      
      // Check if NFC is enabled (Android only)
      if (Platform.OS === 'android') {
        const enabled = await NfcManager.isEnabled();
        if (!enabled) {
          Alert.alert(
            'NFC Disabled',
            'Please enable NFC in your device settings to continue.',
            [
              { text: 'Cancel', style: 'cancel', onPress: () => setScanning(false) },
              { text: 'Go to Settings', onPress: () => {
                setScanning(false);
                Linking.openSettings();
              }}
            ]
          );
          return;
        }
      }
      
      // Request NFC technology
      await NfcManager.requestTechnology(NfcTech.Ndef);
      
      // Get tag info
      const tag = await NfcManager.getTag();
      console.log('Tag found:', tag);
      
      // Process tag data
      processTag(tag);
      
    } catch (error) {
      console.error('Error reading NFC:', error);
      
      // Don't show error if user just cancelled
      if (error.toString().includes('cancelled')) {
        setScanning(false);
        return;
      }
      
      Alert.alert(
        'NFC Error',
        'There was an error reading the NFC tag. Please try again.',
        [{ text: 'OK' }]
      );
      setScanning(false);
    } finally {
      // Clean up
      NfcManager.cancelTechnologyRequest();
    }
  };

  const processTag = (tag) => {
    if (tag) {
      // Extract relevant data from the tag
      const tagData = {
        id: tag.id ? Buffer.from(tag.id).toString('hex').toUpperCase() : 'Unknown',
        type: tag.techTypes ? tag.techTypes.join(', ') : 'Unknown',
        data: 'No readable data',
        timestamp: new Date().toISOString()
      };
      
      // Try to read NDEF data if available
      if (tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefRecord = tag.ndefMessage[0];
        const payload = Ndef.text.decodePayload(ndefRecord.payload);
        tagData.data = payload || 'Empty NDEF message';
      }
      
      handleNFCDetected(tagData);
    }
  };

  const handleNFCDetected = (data) => {
    if (!scanned) {
      setScanned(true);
      setScanning(false);
      setNfcData(data);
      console.log('NFC Data:', data);
    }
  };

  // For testing on devices without NFC
  const simulateNFCDetection = () => {
    const mockData = {
      id: 'AB123456789',
      type: 'MIFARE Classic',
      data: 'Sample NFC Tag Data',
      timestamp: new Date().toISOString()
    };
    
    handleNFCDetected(mockData);
  };

  if (hasNfc === null) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <MaterialCommunityIcons name="nfc" size={60} color="#426bba" />
        <Text style={styles.loadingText}>Initializing NFC...</Text>
      </SafeAreaView>
    );
  }

  if (hasNfc === false) {
    return (
      <SafeAreaView style={styles.notSupportedContainer}>
        <MaterialCommunityIcons name="nfc-off" size={60} color="#e74c3c" />
        <Text style={styles.notSupportedText}>NFC is not supported on this device</Text>
        <TouchableOpacity
          style={styles.simulateButton}
          onPress={simulateNFCDetection}
        >
          <Text style={styles.simulateButtonText}>Simulate NFC Detection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButtonAlt}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonAltText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NFC Reader</Text>
        <View style={{ width: 24 }} />
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* NFC Icon */}
        <View style={styles.nfcIconContainer}>
          <MaterialCommunityIcons 
            name={scanning ? "nfc-search-variant" : "nfc-variant"} 
            size={120} 
            color="#426bba" 
          />
          {scanning && <View style={styles.pulseEffect} />}
        </View>
        
        {/* Status Text */}
        <Text style={styles.statusText}>
          {scanning 
            ? "Hold your device near an NFC tag" 
            : nfcData 
              ? "NFC Tag Detected!" 
              : "Ready to scan NFC tags"}
        </Text>
        
        {/* Instructions */}
        {scanning && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsText}>
              • Keep the device steady{'\n'}
              • Position the NFC tag near the back of your device{'\n'}
              • Wait for the confirmation sound
            </Text>
          </View>
        )}
        
        {/* Action Button */}
        {!scanning && !nfcData && (
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={startScanning}
          >
            <Text style={styles.scanButtonText}>Start NFC Scan</Text>
          </TouchableOpacity>
        )}
        
        {/* Cancel Button */}
        {scanning && (
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={cleanUpNfc}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        
        {/* Results */}
        {nfcData && (
          <View style={styles.resultsContainer}>
            <View style={styles.resultCard}>
              <MaterialCommunityIcons 
                name="check-circle" 
                size={40} 
                color="#4CAF50" 
              />
              <Text style={styles.resultTitle}>NFC Tag Detected</Text>
              
              <View style={styles.resultDataContainer}>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Tag ID:</Text>
                  <Text style={styles.resultValue}>{nfcData.id}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Type:</Text>
                  <Text style={styles.resultValue}>{nfcData.type}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Data:</Text>
                  <Text style={styles.resultValue}>{nfcData.data}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Time:</Text>
                  <Text style={styles.resultValue}>
                    {new Date(nfcData.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.scanAgainButton}
                onPress={startScanning}
              >
                <Text style={styles.scanAgainButtonText}>Scan Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Simulate button for testing */}
        {__DEV__ && !scanning && !nfcData && (
          <TouchableOpacity 
            style={styles.devButton}
            onPress={simulateNFCDetection}
          >
            <Text style={styles.devButtonText}>Simulate (Dev Only)</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#426bba',
  },
  notSupportedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  notSupportedText: {
    fontSize: 18,
    color: '#e74c3c',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  simulateButton: {
    backgroundColor: '#426bba',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 15,
  },
  simulateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonAlt: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#426bba',
  },
  backButtonAltText: {
    color: '#426bba',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#426bba',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  nfcIconContainer: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pulseEffect: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#426bba',
    opacity: 0.5,
    // Add animation in a real app
  },
  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionsContainer: {
    backgroundColor: 'rgba(66, 107, 186, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
  },
  instructionsText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  scanButton: {
    backgroundColor: '#426bba',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsContainer: {
    width: '100%',
    marginTop: 20,
  },
      resultCard: {
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    resultTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 10,
      marginBottom: 20,
    },
    resultDataContainer: {
      width: '100%',
      marginBottom: 20,
    },
    resultRow: {
      flexDirection: 'row',
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      paddingBottom: 10,
    },
    resultLabel: {
      width: '30%',
      fontSize: 16,
      color: '#666',
      fontWeight: 'bold',
    },
    resultValue: {
      width: '70%',
      fontSize: 16,
      color: '#333',
    },
    scanAgainButton: {
      backgroundColor: '#426bba',
      paddingHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 25,
      marginTop: 10,
    },
    scanAgainButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    devButton: {
      position: 'absolute',
      bottom: 20,
      backgroundColor: '#333',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      opacity: 0.7,
    },
    devButtonText: {
      color: '#fff',
      fontSize: 14,
    },
});

export default NFCScreen;

