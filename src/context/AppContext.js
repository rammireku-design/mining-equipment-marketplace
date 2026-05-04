import React, { createContext, useState } from 'react';
import { initialItems } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [items, setItems] = useState(initialItems);
  const [inquiries, setInquiries] = useState([]);

  const addItem = (newItem) => {
    setItems((prevItems) => [{ ...newItem, id: Date.now().toString() }, ...prevItems]);
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  const updateItem = (id, updatedData) => {
    setItems((prev) => 
      prev.map(item => item.id === id ? { ...item, ...updatedData } : item)
    );
  };

  const addInquiry = (item, location) => {
    const newInquiry = {
      id: Date.now().toString(),
      item,
      location,
      status: 'Pending',
      date: new Date().toISOString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries((prev) => 
      prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq)
    );
  };

  return (
    <AppContext.Provider value={{ items, addItem, deleteItem, updateItem, inquiries, addInquiry, updateInquiryStatus }}>
      {children}
    </AppContext.Provider>
  );
};
