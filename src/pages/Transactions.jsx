/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { customStyles, getAccessToken } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrnxs } from "../features/trnxSlice";
import { Link } from "react-router-dom";

const Transactions = ({ setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { trnxs, getTrnxError, getTrnxLoading } = useSelector(
    (state) => state.trnx
  );

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 9;

  // Slice transactions for pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions =
    trnxs && trnxs.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(trnxs.length / transactionsPerPage);

  // Update active page and document title
  useEffect(() => {
    if (accessToken) {
      dispatch(getAllTrnxs());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    setActive("transactions");
    document.title = "RegentOak - Transactions";
  }, [setActive]);

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

  if (getTrnxLoading) {
    return (
      <div className="p-6">
        <p>Fetching Transactions...</p>
      </div>
    );
  }

  if (getTrnxError) {
    return (
      <div className="p-6 text-red-500">
        <p>Fetching Transactions...</p>
      </div>
    );
  }

  return (
    <section className="bg-slate-200 text-slate-900 h-screen w-full overflow-auto">
      <div className="p-10 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h3 className={customStyles.title}>Transactions</h3>
          <Link
            to={"/create-trnx"}
            className="bg-green-600 text-white rounded-3xl px-6 py-2"
          >
            Create Transaction
          </Link>
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className={customStyles.td}>Date</th>
              <th className={customStyles.td}>Amount</th>
              <th className={customStyles.td}>Type</th>
              <th className={customStyles.td}>Receiver Acct</th>
              <th className={customStyles.td}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions &&
              currentTransactions?.map((trnx, index) => (
                <tr
                  key={trnx._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-slate-100" : "bg-slate-300"
                  } text-center`}
                >
                  <td className={customStyles.th}>{trnx?.date || "N/A"}</td>
                  <td className={customStyles.th}>${trnx?.amount || "0.00"}</td>
                  <td className={customStyles.th}>{trnx?.trx_type || "N/A"}</td>
                  <td className={customStyles.th}>{trnx?.receiver || "N/A"}</td>
                  <td className={customStyles.th}>
                    <select className="px-6 py-2">
                      <option value="">Action</option>
                      <option value="delete">Delete</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-6">
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
        </div>
      </div>
    </section>
  );
};

export default Transactions;
