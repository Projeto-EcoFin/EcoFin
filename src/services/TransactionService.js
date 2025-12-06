import axios from "axios";

const API_URL = "http://localhost:3000/api/transactions";

const getUserID = () => localStorage.getItem("user_id_simple");

export const fetchTransactions = async () => {
  const userID = getUserID();
  if (!userID) return [];

  const res = await axios.get(API_URL, {
    headers: { "X-User-ID": userID }
  });

  return res.data;
};

export const createTransaction = async (data) => {
  const userID = getUserID();
  if (!userID) throw new Error("Usuário não encontrado para criar transação");

  const res = await axios.post(API_URL, data, {
    headers: { "X-User-ID": userID }
  });

  return res.data.transaction;
};


export const updateTransaction = async (id, updateData) => {
  const userID = getUserID();
  if (!userID) throw new Error("Usuário não encontrado");

  const res = await axios.put(`${API_URL}/${id}`, updateData, {
    headers: { "X-User-ID": userID }
  });

  return res.data.transaction;
};


export const deleteTransaction = async (id) => {
  const userID = getUserID();
  if (!userID) throw new Error("Usuário não encontrado");

  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { "X-User-ID": userID }
  });

  return res.data.message;
};
