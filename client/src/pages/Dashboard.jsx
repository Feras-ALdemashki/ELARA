import React, { useEffect, useState } from "react";
import axios from "axios";
import { DASHBOARD } from "../utils/api";
import toast from "react-hot-toast";
import Card from "../components/dashboard/Card";
import { FaWallet } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { GiPiggyBank } from "react-icons/gi";

const Dashboard = () => {
  const [data, setData] = useState();
  console.log(data);
  const fetchData = async () => {
    try {
      const response = await axios.get(DASHBOARD.GET, {
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap gap-6 justify-between mt-1.5">
      {data && (
        <>
          <Card
            title="Income"
            value={data.income.total}
            icon={<FaWallet className="text-accent" />}
          />
          <Card
            title="Expenses"
            value={data.expenses.total}
            icon={<FaCreditCard className="text-accent" />}
          />
          <Card
            title="Balance"
            value={data.income.total - data.expenses.total}
            icon={<GiPiggyBank className="text-accent" />}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
