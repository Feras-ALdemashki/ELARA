import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { EXPENSE } from "../utils/api";
import { MdDeleteForever } from "react-icons/md";
import Button from "../components/Button";
import { IoDownloadOutline } from "react-icons/io5";

const Expenses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(EXPENSE.GET_ALL, {
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      toast.error("Failed to fetch expenses data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(EXPENSE.DELETE(id), { withCredentials: true });
      toast.success("Expense deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const downloadExcel = async () => {
    try {
      const res = await axios.get(EXPENSE.GET_EXCEL, {
        withCredentials: true,
        responseType: "blob", // 👈 important
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("something went wrong please try again later");
    }
  };

  return (
    <div>
      {loading ? (
        <p className="text-gray-500 text-center">Loading expenses...</p>
      ) : (
        <div className="space-y-4">
          {data.length === 0 ? (
            <p className="text-center text-gray-500">
              Start by adding some expenses
            </p>
          ) : (
            <>
              <div>
                <Button
                  name={"Download Excel sheet"}
                  icon={IoDownloadOutline}
                  onClick={downloadExcel}
                />
              </div>

              {data.map((expense) => {
                const formattedDate = new Date(expense.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                );

                return (
                  <div
                    key={expense._id}
                    className="relative flex items-center justify-between bg-white rounded-lg shadow p-4"
                  >
                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="absolute top-2 right-2 hover:text-accent2 text-sm font-bold"
                    >
                      <MdDeleteForever />
                    </button>

                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{expense.emoji}</span>
                      <div>
                        <p className="font-semibold">{expense.category}</p>
                        <p className="text-sm text-gray-500">{formattedDate}</p>
                        <p className="text-sm text-gray-600">
                          {expense.description}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-800">${expense.amount}</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Expenses;
