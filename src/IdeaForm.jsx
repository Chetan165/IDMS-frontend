import React, { useState } from "react";

const mockGetUserId = () => "user-abc-12345";

/**
 * Form component for submitting a new Idea.
 * @param {object} props
 * @param {function} props.onSuccess - Callback after successful submission.
 */
const IdeaForm = ({ onSuccess }) => {
  // Initial state matching the Mongoose Schema fields
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    SoftSavings: 0,
    HardSavings: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("Savings") ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // 1. Prepare Payload (Add required backend fields)
    const payload = {
      ...formData,
      UserId: mockGetUserId(), // Mandatory field from your schema
      Status: "Draft", // Default status set by the backend/schema
    };

    // 2. Simulate API Call (Replace with actual fetch/axios call to Express POST route)
    console.log("Attempting to submit idea:", payload);

    try {
      // await fetch('/api/ideas', { /* config... */ });

      // --- MOCK RESPONSE FOR MVP ---
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // -----------------------------

      setMessage("Idea submitted successfully! It is now in Draft status.");
      setFormData({
        Title: "",
        Description: "",
        SoftSavings: 0,
        HardSavings: 0,
      });

      if (onSuccess) {
        onSuccess(); // Close modal or navigate back
      }
    } catch (error) {
      setMessage("Error submitting idea. Please check the server connection.");
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-2xl font-inter">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">
        Submit New Idea
      </h2>

      {message && (
        <div
          className={`p-3 mb-4 rounded-lg text-sm ${
            message.startsWith("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputGroup
          label="Idea Title"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          required
        />

        <TextAreaGroup
          label="Idea Description"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="Estimated Hard Savings ($)"
            name="HardSavings"
            value={formData.HardSavings}
            onChange={handleChange}
            type="number"
          />
          <InputGroup
            label="Estimated Soft Savings (Hours/Month)"
            name="SoftSavings"
            value={formData.SoftSavings}
            onChange={handleChange}
            type="number"
          />
        </div>

        <p className="text-xs text-gray-500 italic pt-2">
          Note: Your idea will automatically be saved with the Status: 'Draft'.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-800 transition duration-200 shadow-md disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit Idea"}
        </button>
      </form>
    </div>
  );
};

// Helper component for cleaner form layout
const InputGroup = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = true,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">{required ? "*" : ""}</span>
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      min={type === "number" ? 0 : undefined}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
    />
  </div>
);

const TextAreaGroup = ({ label, name, value, onChange, required = true }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">{required ? "*" : ""}</span>
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows="4"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-y"
    ></textarea>
  </div>
);

export default IdeaForm;
