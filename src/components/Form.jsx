import React, { useState } from "react";

const FormTransaction = ({
  initialValues = { item: "", price: "", date: "", status: "", id: "" },
  onSubmit,
  buttonText,
}) => {
  const [transaction, setTransaction] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };
  
  const validateForm = () => {
    const errors = {};
    if (!transaction.item) errors.item = "Item is required.";
    if (!transaction.price || transaction.price <= 0) errors.price = "Price must be a positive number.";
    if (!transaction.date) errors.date = "Date is required.";
    if (!transaction.status) errors.status = "Status is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onSubmit(transaction);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded">
      <div className="mb-4">
        <label className="block text-gray-700">Item</label>
        <input
          type="text"
          name="item"
          placeholder="Input Item Name"
          value={transaction.item}
          onChange={handleChange}
          className="w-full px-4 p-2 border rounded-full"
        />
        {errors.item && <p className="text-red-500 text-sm">{errors.item}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <div className="relative mt-1">
          <i
            className={`bx bx-dollar absolute left-4 ${
              errors.price ? "top-1/3" : "top-1/2"
            } transform -translate-y-1/2 text-gray-400 transition-colors duration-300 pointer-events-none`}
          ></i>
          <input
            type="number"
            name="price"
            placeholder="0"
            value={transaction.price}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border rounded-full"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <div className="relative mt-1">
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            className="w-full px-4 p-2 border rounded-full"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <div className="relative mt-1">
          <select
            name="status"
            placeholder="Select Status"
            value={transaction.status}
            onChange={handleChange}
            className="w-full px-4 p-2 border rounded-full appearance-none"
          >
            <option className="text-gray-400" value="">
              Select Status
            </option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
          <i
            className={`bx bx-chevron-down absolute right-4 ${
              errors.status ? "top-1/3" : "top-1/2"
            } transform -translate-y-1/2 text-gray-400 transition-colors duration-300 pointer-events-none`}
          ></i>
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-full"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default FormTransaction;
