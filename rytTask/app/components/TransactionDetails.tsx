import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Define Transaction type
interface Transaction {
  id: string;
  recipientBank: string;
  accountNumber: string;
  transferMethod: string;
  transferType: string;
  amount: number;
  description: string;
  createdAt: string;
}

interface TransactionDetailsProps {
  visible: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  visible,
  onClose,
  transaction,
}) => {
  // method
  const formatAmount = (amount: number): string => {
    return amount.toFixed(2);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-MY", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // If no transaction is provided, don't render anything
  if (!transaction) return null;

  // Ui
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-11/12 bg-white rounded-xl p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold">Transaction Details</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome name="times" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View className="bg-blue-50 p-4 rounded-lg mb-6">
            <Text className="font-bold text-lg text-center">
              {formatAmount(transaction.amount)}
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-3 mb-3">
            <Text className="text-gray-500">Transaction Date</Text>
            <Text className="font-medium">
              {formatDate(transaction.createdAt)}
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-3 mb-3">
            <Text className="text-gray-500">Recipient Bank</Text>
            <Text className="font-medium">{transaction.recipientBank}</Text>
          </View>

          <View className="border-b border-gray-200 pb-3 mb-3">
            <Text className="text-gray-500">Account Number</Text>
            <Text className="font-medium">{transaction.accountNumber}</Text>
          </View>

          <View className="border-b border-gray-200 pb-3 mb-3">
            <Text className="text-gray-500">Transfer Method</Text>
            <Text className="font-medium">{transaction.transferMethod}</Text>
          </View>

          <View className="border-b border-gray-200 pb-3 mb-3">
            <Text className="text-gray-500">Transfer Type</Text>
            <Text className="font-medium">{transaction.transferType}</Text>
          </View>

          {transaction.description && (
            <View className="border-b border-gray-200 pb-3 mb-6">
              <Text className="text-gray-500">Description</Text>
              <Text className="font-medium">{transaction.description}</Text>
            </View>
          )}

          <TouchableOpacity
            className="py-3 bg-blue-500 rounded-lg mt-4"
            onPress={onClose}
          >
            <Text className="text-white text-center font-medium">Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default TransactionDetails;
