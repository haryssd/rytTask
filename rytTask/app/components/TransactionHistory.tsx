import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import TransactionDetails from "./TransactionDetails";

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

const TransactionItem: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  //computed

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
      <Text className="font-medium ">MYR {transaction.amount.toFixed(2)}</Text>
    </View>
  );
};

//Props
interface TransactionHistoryProps {
  visible: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  visible,
  onClose,
  transactions,
}) => {
  // state
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  // methods
  const handleClose = () => {
    onClose();
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
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
          <Text className="text-xl font-bold">Transaction History</Text>
          <TouchableOpacity onPress={handleClose}>
            <FontAwesome name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleTransactionPress(item)}>
              <TransactionItem transaction={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          className="p-4"
          showsVerticalScrollIndicator={true}
        />

        {/* Transaction Details compo */}
        <TransactionDetails
          visible={detailsVisible}
          onClose={handleCloseDetails}
          transaction={selectedTransaction}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default TransactionHistory;
