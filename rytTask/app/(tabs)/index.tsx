import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import BiometricError from "../components/BiometricError";
import TransactionHistory from "../components/TransactionHistory";
import TransactionDetails from "../components/TransactionDetails";
import { useBalance, Transaction } from "../context/BalanceContext";

// Transaction item component
const TransactionItem: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {

  // methods
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-MY", {
      month: "short",
      day: "numeric",
    });
  };

  // UI
  return (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
      <View className="flex-1">
        <Text className="font-medium">{transaction.description}</Text>
        <Text className="text-xs text-gray-500">
          {formatDate(transaction.createdAt)}
        </Text>
      </View>
      <Text className="font-medium">MYR {transaction.amount.toFixed(2)}</Text>
    </View>
  );
};

const Index: React.FC = () => {
  // state
  const [isVisible, setVisible] = useState<boolean>(false);
  const [biometricErrorVisible, setBiometricErrorVisible] =
    useState<boolean>(false);
  const [hasBiometrics, setHasBiometrics] = useState<boolean>(false);
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionModalVisible, setTransactionModalVisible] =
    useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const { balance, transactions } = useBalance();

  // Created/Lifecycle
  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  // methods
  const checkBiometricAvailability = async (): Promise<void> => {
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

  const authenticateUser = async (): Promise<boolean> => {
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

  const handleRetryAuthentication = async (): Promise<void> => {
    setBiometricErrorVisible(false);
    setTimeout(async () => {
      const authenticated = await authenticateUser();
      if (authenticated) {
        setVisible(true);
      }
    }, 500);
  };

  const handleCloseApp = (): void => {
    Alert.alert("Exit App", "exit the application");
  };

  const toggleVisibility = async (): Promise<void> => {
    if (!isVisible) {
      const authenticated = await authenticateUser();
      if (authenticated) {
        setVisible(true);
      }
    } else {
      setVisible(false);
    }
  };

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailsVisible(true);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(false);
    setSelectedTransaction(null);
  };

  // UI
  return (
    <SafeAreaView className="flex-1">
      <View className="flex items-center px-4 py-6">
        <Text className="text-5xl text-black mb-6 mt-8">Welcome !</Text>

        <View className="w-full bg-white rounded-xl shadow-sm p-6 mb-4 mt-6">
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
            {isVisible ? `MYR ${balance.toFixed(2)}` : "MYR ******"}
          </Text>
        </View>

        {/* Transaction History */}
        <View className="w-full mt-6 mb-4">
          <Text className="font-bold text-lg text-center mb-2">
            Transaction History
          </Text>
          <View className="border-t border-gray-300 mb-4"></View>

          <View className="bg-white rounded-xl shadow-sm p-4">
            {transactions.slice(0, 4).map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleTransactionPress(item)}
              >
                <TransactionItem transaction={item} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            className="mt-2 items-center"
            onPress={() => setTransactionModalVisible(true)}
          >
            <Text className="text-blue-600">View More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Biometric Error */}
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

      {/* Transaction History */}
      <TransactionHistory
        visible={transactionModalVisible}
        onClose={() => setTransactionModalVisible(false)}
        transactions={transactions}
      />

      {/* Transaction Details Modal */}
      <TransactionDetails
        visible={detailsVisible}
        onClose={handleCloseDetails}
        transaction={selectedTransaction}
      />
    </SafeAreaView>
  );
};

export default Index;
