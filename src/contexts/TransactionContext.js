import React, { createContext, useContext, useState } from "react";
import api from "../service/api";

const TransactionContext = createContext();

export const useTransactionContext = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null);

  const getTransaction = async () => {
    const response = await api.get("/crud");
    setTransactions(response.data);
  };

  const getTransactionById = async (id) => {
    const response = await api.get(`/crud/${id}`);
    setTransaction(response.data);
  };

  const createTransaction = async (data) => {
    const response = await api.post("/crud", data);
    setTransactions([...transactions, response.data]);
  };

  const updateTransaction = async (id, updatedData) => {
    const response = await api.put(`/crud/${id}`, updatedData);
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id ? response.data : transaction
      )
    );
  };

  const deleteTransaction = async (id) => {
    await api.delete(`/crud/${id}`);
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        getTransaction,
        transaction,
        getTransactionById,
        createTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};