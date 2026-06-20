import { useEffect } from "react";

function MyInvoice() {
  useEffect(() => {
    window.location.href = "https://socios.copeospilltda.com/login";
  }, []);

  return null;
}

export default MyInvoice;
