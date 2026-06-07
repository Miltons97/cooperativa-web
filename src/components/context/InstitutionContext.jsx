import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "../../config/api";

export const InstitucionContext = createContext();

export const InstitucionProvider = ({ children }) => {
  const [info, setInfo] = useState([]);
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/institucion`)
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => {});

    fetch(`${API_URL}/multimedia`)
      .then((res) => res.json())
      .then((data) => setArchivos(data))
      .catch(() => {});
  }, []);

  return (
    <InstitucionContext.Provider value={{ info, archivos }}>
      {children}
    </InstitucionContext.Provider>
  );
};
