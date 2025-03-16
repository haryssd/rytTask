import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Bank } from "../models/types";

interface BankSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectBank: (bank: Bank) => void;
  selectedBankName: string;
  banks: Bank[];
}

const BankSelectionModal = ({
  visible,
  onClose,
  onSelectBank,
  selectedBankName,
  banks,
}: BankSelectionModalProps) => {
  // state
  const [searchQuery, setSearchQuery] = useState("");

  // computed
  const filteredBanks = searchQuery
    ? banks.filter((bank) =>
        bank.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : banks;

  // methods
  const handleSelectBank = (bank: Bank) => {
    onSelectBank(bank);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // UI
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        <SafeAreaView className="flex-1">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-xl font-medium">Recipient Bank</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome name="times" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View className="px-4 py-3">
            <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-2">
              <TextInput
                className="flex-1 text-base"
                placeholder="Search"
                value={searchQuery}
                onChangeText={handleSearchChange}
              />
              <FontAwesome name="search" size={20} color="#666" />
            </View>
          </View>

          <FlatList
            data={filteredBanks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row items-center px-4 py-3 border-b border-gray-100"
                onPress={() => handleSelectBank(item)}
              >
                <View
                  className="w-10 h-10 rounded-full justify-center items-center mr-3"
                  style={{
                    backgroundColor: item.id === "1" ? "#f03e3e" : "#e9ecef",
                  }}
                >
                  <Text className="text-xl">{item.logo}</Text>
                </View>
                <Text className="text-base">{item.name}</Text>
                {item.name === selectedBankName && (
                  <View className="ml-auto">
                    <FontAwesome name="check" size={20} color="#12b886" />
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default BankSelectionModal;
