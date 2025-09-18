import React, { useEffect, useState } from "react";
import axios from "axios";
import { DASHBOARD } from "../utils/api";
import toast from "react-hot-toast";
import Card from "../components/dashboard/Card";
import { FaWallet, FaCreditCard } from "react-icons/fa";
import { GiPiggyBank } from "react-icons/gi";
import Last5Income from "../components/dashboard/Last5Income";
import Last5Expenses from "../components/dashboard/Last5Expenses";
import ExpensesPieChart from "../components/dashboard/ExpensesPieChart";
import IncomesBarChart from "../components/dashboard/IncomesBarChart";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [model, setModel] = useState(false);
  const [loading, setLoading] = useState(true);

  const onClose = () => {
    setModel(false);
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(DASHBOARD.GET, {
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    // Full-page centered loader
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* Modal */}
      {model && <Modal onClose={onClose} />}

      {/* Cards Row */}
      <div className="flex flex-wrap gap-6 justify-center md:justify-between mt-1.5">
        <Card
          title="Income"
          value={data.income.total.toFixed(1)}
          icon={<FaWallet className="text-accent" />}
        />
        <Card
          title="Expenses"
          value={data.expenses.total.toFixed(1)}
          icon={<FaCreditCard className="text-accent2" />}
        />
        <Card
          title="Balance"
          value={(data.income.total - data.expenses.total).toFixed(1)}
          icon={<GiPiggyBank className="text-[#4a90e2]" />}
        />
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 auto-rows-fr">
        <div className="bg-white rounded-lg shadow p-6 h-full">
          <Last5Expenses data={data} onClick={() => setModel(true)} />
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-full">
          <ExpensesPieChart data={data} />
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-full">
          <IncomesBarChart data={data} />
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-full">
          <Last5Income data={data} onClick={() => setModel(true)} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
