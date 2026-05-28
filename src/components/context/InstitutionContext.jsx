import React, { createContext, useState, useEffect } from "react";

export const InstitucionContext = createContext();

export const InstitucionProvider = ({ children }) => {
  const [info, setInfo] = useState([]);
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/institucion")
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:3000/multimedia")
      .then((res) => res.json())
      .then((data) => setArchivos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <InstitucionContext.Provider value={{ info, archivos }}>
      {children}
    </InstitucionContext.Provider>
  );
};
