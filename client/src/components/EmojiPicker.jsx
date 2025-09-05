import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { FaSmile, FaTimes } from "react-icons/fa";

const EmojiPickerField = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    onChange(emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <div className="flex items-center justify-between">
        <span className="text-gray-700 font-medium">Select Icon</span>

        <div className="flex items-center gap-2">
          <div className="text-2xl">{value}</div>

          {/* Open picker */}
          <button
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            onClick={() => setShowPicker(!showPicker)}
            title={value ? "Change Icon" : "Add Icon"}
          >
            <FaSmile size={18} />
          </button>

          {/* Remove emoji */}
          {value && (
            <button
              className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
              onClick={() => onChange(null)}
              title="Remove Icon"
            >
              <FaTimes size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Picker dropdown */}
      {showPicker && (
        <div className="flex justify-center">
          <Picker
            onEmojiClick={handleEmojiClick}
            width={window.innerWidth < 640 ? 280 : 350}
            height={window.innerWidth < 640 ? 350 : 400}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerField;
