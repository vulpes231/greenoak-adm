/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { customStyles } from "../constants";

const Recentactivities = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 9;

  // Slice transactions for pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions =
    transactions &&
    transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <table className="min-w-full ">
      <thead>
        <tr className="text-center bg-green-600 text-white">
          <th className={customStyles.td}>date</th>
          <th className={customStyles.td}>amount</th>
          <th className={customStyles.td}>recipient</th>
          <th className={customStyles.td}>type</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {currentTransactions &&
          currentTransactions.map((transaction, index) => {
            return (
              <tr
                key={transaction._id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-slate-100" : "bg-slate-300"
                } text-center`}
              >
                <td className={customStyles.th}>{transaction.date}</td>
                <td className={customStyles.th}>{transaction.amount}</td>
                <td className={customStyles.th}>{transaction.receiver}</td>
                <td className={customStyles.th}>
                  {transaction.trx_type || "N/A"}
                </td>
              </tr>
            );
          })}
      </tbody>
      {/* <tfoot className="flex justify-between mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-green-600 text-white rounded-3xl px-6 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-green-600 text-white rounded-3xl px-6 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </tfoot> */}
    </table>
  );
};

export default Recentactivities;
