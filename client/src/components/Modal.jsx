import React, { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Input from "./Input";
import SelectCategory from "./Select";
import EmojiPickerField from "./EmojiPicker";
import { EXPENSE, INCOME } from "../utils/api";
import axios from "axios";
import toast from "react-hot-toast";

const Modal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    emoji: null,
    amount: "",
    type: null,
    category: null,
    date: "",
    description: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const amountNumber = Number(formData.amount);

    // Validation
    if (!formData.emoji) return toast.error("Please select an icon");
    if (!formData.amount || isNaN(amountNumber) || amountNumber <= 0)
      return toast.error("Please enter a valid number for amount");
    if (!formData.type)
      return toast.error("Please select type (Income or Expense)");
    if (!formData.category) return toast.error("Please select a category");
    if (!formData.date) return toast.error("Please select a date");
    if (!formData.description) return toast.error("Please enter description");

    try {
      const payload = {
        emoji: formData.emoji,
        amount: amountNumber,
        category: formData.category.label,
        date: formData.date,
        description: formData.description,
      };

      const endpoint =
        formData.type.value === "expense" ? EXPENSE.ADD : INCOME.ADD;

      await axios.post(endpoint, payload, { withCredentials: true });
      toast.success("Entry added successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong, please try again later");
    }
  };

  const modalRef = useRef();
  const modalClose = (e) => {
    if (modalRef.current === e.target) onClose();
  };

  return (
    <div
      ref={modalRef}
      onClick={modalClose}
      className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[600px] flex flex-col gap-4">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
          onClick={onClose}
        >
          <FaTimes size={16} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 text-center">
          Add Income / Expense
        </h2>

        <EmojiPickerField
          value={formData.emoji}
          onChange={(emoji) => handleChange("emoji", emoji)}
        />

        {/* Two-column layout */}
        <div className="flex gap-4">
          <Input
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div>
          {" "}
          <SelectCategory
            type={formData.type}
            category={formData.category}
            onTypeChange={(val) => handleChange("type", val)}
            onCategoryChange={(val) => handleChange("category", val)}
          />
        </div>
        <div className="flex gap-4">
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
          <Input
            label="Description"
            type="text"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Optional description"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
