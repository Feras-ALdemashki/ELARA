import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { INCOME } from "../utils/api";
import { MdDeleteForever } from "react-icons/md";

const Incomes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(INCOME.GET_ALL, {
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      toast.error("Failed to fetch income data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(INCOME.DELETE(id), { withCredentials: true });
      toast.success("Income deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete income");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-gray-500 text-center">Loading incomes...</p>
      ) : (
        <div className="space-y-4">
          {data.map((income) => {
            const formattedDate = new Date(income.date).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            );

            return (
              <div
                key={income.id}
                className="relative flex items-center justify-between bg-white rounded-lg shadow p-4"
              >
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(income._id)}
                  className="absolute top-2 right-2  hover:text-accent2 text-sm font-bold"
                >
                  <MdDeleteForever />
                </button>

                <div className="flex items-center gap-4">
                  <span className="text-2xl">{income.emoji}</span>
                  <div>
                    <p className="font-semibold">{income.category}</p>
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                    <p className="text-sm text-gray-600">
                      {income.description}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-gray-800">${income.amount}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Incomes;
