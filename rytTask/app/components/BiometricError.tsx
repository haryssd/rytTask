import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface BiometricErrorModalProps {
  visible: boolean;
  onRetry: () => void;
  onClose: () => void;
  errorMessage?: string;
}

const BiometricErrorModal = ({
  visible,
  onRetry,
  onClose,
  errorMessage = "We couldn't verify your identity using biometrics",
}: BiometricErrorModalProps) => {
  // UI
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-11/12 bg-white rounded-xl p-6">
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
              <FontAwesome
                name="exclamation-circle"
                size={40}
                color="#EF4444"
              />
            </View>
            <Text className="text-xl font-bold text-center">
              Authentication Failed
            </Text>
          </View>

          <Text className="text-gray-700 text-center mb-6">{errorMessage}</Text>

          <View className="mb-4">
            <TouchableOpacity
              className="bg-blue-500 py-3 px-6 rounded-lg mb-3"
              onPress={onRetry}
            >
              <Text className="text-white text-center font-medium">
                Try Again
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-200 py-3 px-6 rounded-lg"
              onPress={onClose}
            >
              <Text className="text-gray-700 text-center font-medium">
                Close App
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-xs text-gray-500 text-center">
            If you continue to experience issues, please contact customer
            support.
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BiometricErrorModal;
