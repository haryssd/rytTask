import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import BankSelectionModal from "../components/BankSelectionModal";
import TransferConfirmation from "../components/TransferConfirmation";
import { Bank } from "../models/types";

// bank data
const banks: Bank[] = [
  { id: "1", name: "CIMB ", logo: "🔴" },
  { id: "2", name: "Alliance Bank ", logo: "🔵" },
  { id: "3", name: "AmBank", logo: "🔴" },
  { id: "4", name: "Maybank", logo: "🟡" },
  { id: "5", name: "Bank Islam", logo: "🟢" },
  { id: "6", name: "Bank Muamalat", logo: "🟤" },
];

const Transfer = () => {
  // state
  const [recipientBank, setRecipientBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [transferMethod, setTransferMethod] = useState("DuitNow");
  const [transferType, setTransferType] = useState("Fund Transfer");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // computed
  const isFormValid = Boolean(recipientBank && accountNumber && amount);

  // methods
  const selectBank = (bank: Bank) => {
    setRecipientBank(bank.name);
    setModalVisible(false);
  };

  const handleTransferMethodSelect = (method: string) => {
    setTransferMethod(method);
  };

  const handleTransferTypeSelect = (type: string) => {
    setTransferType(type);
  };

  const handleTransfer = () => {
    if (!isFormValid) {
      console.log("Form is invalid");
      return;
    }

    setConfirmationVisible(true);

    // console.log("Transfer initiated", {
    //   recipientBank,
    //   accountNumber,
    //   transferMethod,
    //   transferType,
    //   amount,
    //   description,
    // });
  };

  const processTransfer = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Transfer successful", {
        recipientBank,
        accountNumber,
        transferMethod,
        transferType,
        amount,
        description,
      });

      setLoading(false);
      setConfirmationVisible(false);

      setRecipientBank("");
      setAccountNumber("");
      setAmount("");
      setDescription("");
      setTransferMethod("DuitNow");
      setTransferType("Fund Transfer");

      alert("Transfer completed successfully!");

      router.navigate({
        pathname: "/(tabs)",
      });
    } catch (error) {
      setLoading(false);
      console.error("Transfer failed", error);
      alert("Transfer failed. Please try again.");
    }
  };

  // UI
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        className="flex-1 px-4 py-6"
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={50}
      >
        <Text className="text-xl font-medium mb-6">Recipient Bank</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="border border-gray-300 rounded-full p-4 mb-6 flex-row justify-between items-center"
        >
          <Text className="text-lg text-gray-700">
            {recipientBank || "Select Bank"}
          </Text>
          <FontAwesome name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>

        <Text className="text-xl font-medium mb-2">Account Number</Text>
        <TextInput
          className="bg-gray-200 p-3 rounded mb-6"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="number-pad"
          placeholder="Enter account number"
        />

        <Text className="text-xl font-medium mb-2">Transfer Method</Text>
        <View className="flex-row mb-6">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg mr-2 ${
              transferMethod === "DuitNow"
                ? "bg-white border border-blue-500"
                : "bg-gray-200"
            }`}
            onPress={() => handleTransferMethodSelect("DuitNow")}
          >
            <Text className="text-center">DuitNow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ml-2 ${
              transferMethod === "IBG"
                ? "bg-white border border-blue-500"
                : "bg-gray-200"
            }`}
            onPress={() => handleTransferMethodSelect("IBG")}
          >
            <Text className="text-center">IBG</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xl font-medium mb-2">Type</Text>
        <View className="flex-row mb-6">
          <TouchableOpacity
            className={`flex-1 py-4 rounded-lg mr-2 ${
              transferType === "Fund Transfer"
                ? "bg-white border border-blue-500"
                : "bg-gray-200"
            }`}
            onPress={() => handleTransferTypeSelect("Fund Transfer")}
          >
            <Text className="text-center">Fund Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-4 rounded-lg ml-2 ${
              transferType === "Credit Card"
                ? "bg-white border border-blue-500"
                : "bg-gray-200"
            }`}
            onPress={() => handleTransferTypeSelect("Credit Card")}
          >
            <Text className="text-center">Credit Card</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xl font-medium mb-2">Amount</Text>
        <TextInput
          className="bg-gray-200 p-3 rounded mb-6"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0.00"
        />

        <Text className="text-xl font-medium mb-2">Description</Text>
        <TextInput
          className="bg-gray-200 p-3 rounded mb-6"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />

        <TouchableOpacity
          className={`py-3 rounded self-center px-8 mb-6 ${
            isFormValid ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={handleTransfer}
          disabled={!isFormValid}
        >
          <Text
            className={`text-center ${
              isFormValid ? "text-white" : "text-gray-500"
            }`}
          >
            Transfer
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      {/* Bank Selection Modal */}
      <BankSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectBank={selectBank}
        selectedBankName={recipientBank}
        banks={banks}
      />

      <TransferConfirmation
        visible={confirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        onConfirm={processTransfer}
        transferDetails={{
          recipientBank,
          accountNumber,
          amount,
          description,
          transferMethod,
          transferType,
        }}
        loading={loading}
      />
    </SafeAreaView>
  );
};

export default Transfer;
