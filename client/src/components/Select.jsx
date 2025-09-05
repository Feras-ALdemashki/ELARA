import Select from "react-select";

const SelectCategory = ({ type, category, onTypeChange, onCategoryChange }) => {
  const typeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const incomeCategories = [
    { value: "job", label: "Job" },
    { value: "freelance", label: "Freelance" },
    { value: "investments", label: "Investments" },
    { value: "rental", label: "Rental" },
    { value: "gift", label: "Gift" },
  ];

  const expenseCategories = [
    { value: "food", label: "Food & Groceries" },
    { value: "rent", label: "Rent" },
    { value: "transport", label: "Transport" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "health", label: "Health" },
    { value: "utilities", label: "Utilities" },
    { value: "education", label: "Education" },
    { value: "travel", label: "Travel" },
    { value: "other", label: "Other" },
  ];

  const categoryOptions =
    type?.value === "income" ? incomeCategories : expenseCategories;

  return (
    <div className="flex flex-col gap-4">
      <Select
        options={typeOptions}
        value={type}
        onChange={(selected) => {
          onTypeChange(selected);
          onCategoryChange(null); // reset category when type changes
        }}
        placeholder="Select Type"
      />

      <Select
        options={categoryOptions}
        value={category}
        onChange={onCategoryChange}
        placeholder={
          type ? `Select ${type.label} Category` : "Choose type first"
        }
        isDisabled={!type}
      />
    </div>
  );
};

export default SelectCategory;
