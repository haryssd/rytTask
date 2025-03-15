import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface TransferConfirmationProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transferDetails: {
    recipientBank: string;
    accountNumber: string;
    amount: string;
    description: string;
    transferMethod: string;
    transferType: string;
  };
  loading: boolean;
}

const TransferConfirmation = ({
  visible,
  onClose,
  onConfirm,
  transferDetails,
  loading,
}: TransferConfirmationProps) => {
  const formatAmount = (amount: string) => {
    const numAmount = parseFloat(amount);
    return isNaN(numAmount) ? "0.00" : numAmount.toFixed(2);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-11/12 bg-white rounded-xl p-6">
          {loading ? (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color="#3366FF" />
              <Text className="text-lg font-medium mt-4 text-center">
                Processing your transfer...
              </Text>
              <Text className="text-gray-500 text-center mt-2">
                Please do not close this screen.
              </Text>
            </View>
          ) : (
            <>
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold">Confirm Transfer</Text>
                <TouchableOpacity onPress={onClose}>
                  <FontAwesome name="times" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <View className="bg-blue-50 p-4 rounded-lg mb-6">
                <Text className="text-blue-800 font-bold text-lg text-center">
                  MYR {formatAmount(transferDetails.amount)}
                </Text>
              </View>

              <View className="border-b border-gray-200 pb-3 mb-3">
                <Text className="text-gray-500">Recipient Bank</Text>
                <Text className="font-medium">
                  {transferDetails.recipientBank}
                </Text>
              </View>

              <View className="border-b border-gray-200 pb-3 mb-3">
                <Text className="text-gray-500">Account Number</Text>
                <Text className="font-medium">
                  {transferDetails.accountNumber}
                </Text>
              </View>

              <View className="border-b border-gray-200 pb-3 mb-3">
                <Text className="text-gray-500">Transfer Method</Text>
                <Text className="font-medium">
                  {transferDetails.transferMethod}
                </Text>
              </View>

              <View className="border-b border-gray-200 pb-3 mb-3">
                <Text className="text-gray-500">Transfer Type</Text>
                <Text className="font-medium">
                  {transferDetails.transferType}
                </Text>
              </View>

              {transferDetails.description && (
                <View className="border-b border-gray-200 pb-3 mb-6">
                  <Text className="text-gray-500">Description</Text>
                  <Text className="font-medium">
                    {transferDetails.description}
                  </Text>
                </View>
              )}

              <View className="flex-row gap-3 mt-4">
                <TouchableOpacity
                  className="flex-1 py-3 bg-gray-200 rounded-lg"
                  onPress={onClose}
                >
                  <Text className="text-center font-medium">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 py-3 bg-blue-500 rounded-lg"
                  onPress={onConfirm}
                >
                  <Text className="text-white text-center font-medium">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default TransferConfirmation;
