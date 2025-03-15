import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

// state
const index = () => {
  const [isVisible, setVisible] = useState(false);

  // method
  const toggleVisibility = () => {
    setVisible(!isVisible);
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
    </SafeAreaView>
  );
};

export default index;
