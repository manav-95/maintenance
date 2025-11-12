import React, { useState } from "react";
import { MdPayments } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

type PaymentFormState = {
  title: string;
  issueDate: string;
  dueDate: string;
  amount: string;
  description: string;
  createdBy: string;
};

const defaultFormState: PaymentFormState = {
  title: "",
  issueDate: new Date().toISOString().split("T")[0], // today’s date (YYYY-MM-DD)
  dueDate: "",
  amount: "",
  description: "",
  createdBy: "",
};

const AddPayment: React.FC = () => {
  const { user } = useAuth();

  const [form, setForm] = useState<PaymentFormState>(defaultFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.title.trim()) err.title = "Payment title is required";
    if (!form.dueDate.trim()) err.dueDate = "Due date is required";
    if (!form.amount.trim()) err.amount = "Amount is required";
    else if (Number(form.amount) <= 0) err.amount = "Amount must be greater than 0";
    if (!form.description.trim()) err.description = "Description is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    if (!validate()) return;
    setSubmitting(true);

    const createdBy = user?.id;
    try {
      const response = await axios.post(`${baseUrl}/payment/create`, {...form, createdBy})
      if (response.status === 201) {
        setSuccess("Payment created successfully.");
        setForm(defaultFormState);
      } else {
        alert(response.data.message || "Failed to Create Payment. Try Again")
      }

    } catch (error) {
      console.error(error);
      setErrors({ general: "Failed to create payment. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-0.5">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col max-w-7xl bg-card rounded-sm px-6 py-5 space-y-6 mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-start w-full">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MdPayments className="text-primary w-6 h-6" />
              Add Payment
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Create and share payment details with society members.
            </p>
          </div>
          <span className="text-sm font-semibold bg-primary/90 text-card px-3 py-1.5 rounded">
            Society Name: {user?.society?.name || "N/A"}
          </span>
        </div>

        {/* Alerts */}
        {errors.general && (
          <div className="text-xs text-red-600">{errors.general}</div>
        )}
        {success && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded-sm">
            {success}
          </div>
        )}

        {/* Form grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Payment Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter payment title"
              className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.title ? "border-red-300" : "border-slate-200"
                }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Issue Date
            </label>
            <input
              name="issueDate"
              type="date"
              value={form.issueDate}
              disabled
              className="w-full rounded-sm border px-3 py-2 text-sm bg-slate-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Due Date
            </label>
            <input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.dueDate ? "border-red-300" : "border-slate-200"
                }`}
            />
            {errors.dueDate && (
              <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Amount to Pay
            </label>
            <input
              name="amount"
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.amount ? "border-red-300" : "border-slate-200"
                }`}
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter payment description"
              className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.description ? "border-red-300" : "border-slate-200"
                }`}
              rows={3}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm rounded-sm hover:brightness-95 disabled:opacity-70 shadow-sm"
          >
            {submitting ? "Creating..." : "Create Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPayment;
