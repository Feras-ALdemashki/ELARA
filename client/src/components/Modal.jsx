import React, { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Input from "./Input";
import SelectCategory from "./Select";
import EmojiPickerField from "./EmojiPicker";

const Modal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    emoji: null,
    amount: "",
    type: null,
    category: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", {
      emoji: formData.emoji,
      amount: formData.amount,
      type: formData.type?.value,
      category: formData.category?.value,
    });
  };
  const modalRef = useRef();
  const modalClose = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  return (
    <div
      ref={modalRef}
      onClick={modalClose}
      className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col gap-4">
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

        <Input
          label="Amount"
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="Enter amount"
        />

        <SelectCategory
          type={formData.type}
          category={formData.category}
          onTypeChange={(val) => handleChange("type", val)}
          onCategoryChange={(val) => handleChange("category", val)}
        />

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
