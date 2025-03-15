import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";

const index = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex items-center px-4 py-6">
        <Text className="text-5xl text-black mb-6 mt-8">Welcome !</Text>

        <View className="w-full bg-white rounded-xl shadow-sm p-6 mx-6 mb-4 mt-6">
          {/* Account */}
          <Text className="text-xl font-bold text-gray-800">Account</Text>
          <Text className="text-lg text-gray-600 px-6">account no.</Text>

          {/* Current Balance */}
          <Text className="text-xl font-bold mt-5 text-gray-800">
            Current Balance
          </Text>
          <Text className="text-lg text-gray-600 px-6">MYR</Text>
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
