import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import BiometricError from "../components/BiometricError";

// state
const index = () => {
  const [isVisible, setVisible] = useState(false);
  const [biometricErrorVisible, setBiometricErrorVisible] = useState(false);
  const [hasBiometrics, setHasBiometrics] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  // methods
  const checkBiometricAvailability = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      console.log("ada biometric", hasHardware);
      console.log("on biometric", isEnrolled);

      setHasBiometrics(hasHardware && isEnrolled);
    } catch (error) {
      console.error("Error checking biometric availability:", error);
      setHasBiometrics(false);
    }
  };

  const authenticateUser = async () => {
    try {
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      const hasFaceID = supportedTypes.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      );

      if (hasFaceID) {
        console.log("Face ID is available");
      } else {
        console.log("Face ID not available, falling back to passcode");
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to view sensitive information",
        fallbackLabel: "Use passcode",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
        requireConfirmation: false, 
      });

      if (!result.success) {
        setBiometricErrorVisible(true);
      }

      return result.success;
    } catch (error) {
      console.error("Authentication error:", error);
      setBiometricErrorVisible(true);
      return false;
    }
  };

  const handleRetryAuthentication = async () => {
    setBiometricErrorVisible(false);
    setTimeout(async () => {
      const authenticated = await authenticateUser();
      if (authenticated) {
        setVisible(true);
      }
    }, 500);
  };

  const handleCloseApp = () => {
    Alert.alert("Exit App", "exit the application");
  };

  const toggleVisibility = async () => {
    if (!isVisible) {
      const authenticated = await authenticateUser();
      if (authenticated) {
        setVisible(true);
      }
    } else {
      setVisible(false);
    }
  };

  // UI
  return (
    <SafeAreaView className="flex-1">
      <View className="flex items-center px-4 py-6">
        <Text className="text-5xl text-black mb-6 mt-8">Welcome !</Text>

        <View className="w-full bg-white rounded-xl shadow-sm p-6 mx-6 mb-4 mt-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-gray-800">Account</Text>
            <TouchableOpacity onPress={toggleVisibility}>
              <FontAwesome
                name={isVisible ? "eye" : "eye-slash"}
                size={22}
                color="#4B5563"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-lg text-gray-600 px-6">
            {isVisible ? "1234 5678 9101" : "******"}
          </Text>

          {/* Current Balance */}
          <Text className="text-xl font-bold mt-5 text-gray-800">
            Current Balance
          </Text>
          <Text className="text-lg text-gray-600 px-6">
            {isVisible ? "MYR 10,000.00" : "MYR ******"}
          </Text>
        </View>

        {/* Transaction History */}
        <View className="mb-2">
          <Text className="font-bold text-lg mb-1">Transaction History</Text>
          <View className="border-t border-gray-300 mb-2"></View>

          {/* flatlist */}

          <TouchableOpacity>
            <Text className="text-center text-blue-600">View More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Biometric Error  */}
      <BiometricError
        visible={biometricErrorVisible}
        onRetry={handleRetryAuthentication}
        onClose={handleCloseApp}
        errorMessage={
          hasBiometrics
            ? "Face ID authentication failed. Please try again or close the app."
            : "Passcode authentication failed. Please try again or close the app."
        }
      />
    </SafeAreaView>
  );
};

export default index;
