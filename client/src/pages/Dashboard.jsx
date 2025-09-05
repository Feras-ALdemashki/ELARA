import React, { useEffect, useState } from "react";
import axios from "axios";
import { DASHBOARD } from "../utils/api";
import toast from "react-hot-toast";
import Card from "../components/dashboard/Card";
import { FaWallet } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { GiPiggyBank } from "react-icons/gi";
// import Last5Expenses from "../components/dashboard/Last5Expenses";
import Last5Income from "../components/dashboard/Last5Income";
import Last5Expenses from "../components/dashboard/Last5Expenses";
import ExpensesPieChart from "../components/dashboard/ExpensesPieChart";
import IncomesBarChart from "../components/dashboard/IncomesBarChart";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [data, setData] = useState();
  const [model, setModel] = useState(false);
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
    <>
      {/* Cards Row */}
      <div className="flex flex-wrap gap-6 justify-center md:justify-between mt-1.5">
        {model && (
          <Modal
            onClose={() => {
              setModel(false);
            }}
          />
        )}
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
              icon={<FaCreditCard className="text-accent2" />}
            />
            <Card
              title="Balance"
              value={data.income.total - data.expenses.total}
              icon={<GiPiggyBank className="text-[#4a90e2]" />}
            />
          </>
        )}
      </div>

      {/* Grid Section Under Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <div>
          {data && (
            <Last5Expenses
              data={data}
              onClick={() => {
                setModel(true);
              }}
            />
          )}
        </div>

        <div>{data && <ExpensesPieChart data={data} />}</div>
        <div>{data && <IncomesBarChart data={data} />}</div>
        <div>
          {data && (
            <Last5Income
              data={data}
              onClick={() => {
                setModel(true);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
