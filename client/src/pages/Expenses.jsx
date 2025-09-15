import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { EXPENSE } from "../utils/api";
import { MdDeleteForever } from "react-icons/md";
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

  return (
    <div>
      {loading ? (
        <p className="text-gray-500 text-center">Loading expenses...</p>
      ) : (
        <div className="space-y-4">
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
                key={expense.id}
                className="relative flex items-center justify-between bg-white rounded-lg shadow p-4"
              >
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="absolute top-2 right-2  hover:text-accent2 text-sm font-bold"
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
        </div>
      )}
    </div>
  );
};

export default Expenses;
