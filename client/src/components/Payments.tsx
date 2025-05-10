import React from "react";
import { Link } from "react-router-dom";

const Payments: React.FC = () => {
  return (
    <Link
      to="/payments"
      className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
    >
      Adicionar Créditos
    </Link>
  );
};

export default Payments;
