import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, BackHandler } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import BiometricError from "./components/BiometricError";
import "./global.css";
import { BalanceProvider } from "./context/BalanceContext";

export default function RootLayout() {
  // state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);

  // created / lifecycle
  useEffect(() => {
    authenticateUser();
  }, []);

  // Methods
  const authenticateUser = async () => {
    try {
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      const hasFaceID = supportedTypes.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      );

      console.log("Authentication types:", supportedTypes);
      console.log(hasFaceID ? "Face ID available" : "Face ID not available");

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access Ryt Bank",
        fallbackLabel: "Use passcode",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
        requireConfirmation: false,
      });

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setErrorVisible(true);
      }

      setLoading(false);
    } catch (error) {
      console.error("Authentication error:", error);
      setErrorVisible(true);
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setErrorVisible(false);
    setTimeout(() => {
      authenticateUser();
    }, 500);
  };

  const handleClose = () => {
    BackHandler.exitApp();
    setErrorVisible(false);
    setLoading(false);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl">Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <BiometricError
          visible={errorVisible}
          onRetry={handleRetry}
          onClose={handleClose}
          errorMessage="Authentication required to access the app"
        />
      </View>
    );
  }

  return (
    <BalanceProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </BalanceProvider>
  );
}
