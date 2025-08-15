import React, { createContext, useState, useContext } from "react";

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    isCACRegistered: false,
    slogan: "",
    hasBranches: false,
    images: [],
    email: "",
    phone: "",
    website: "",
    address: "",
    tags: "",
    description: "",
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);