import React, { useState } from "react";
import { MdPayments } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

interface Payments {
    _id: string;
    title: string;
    amount: number;
    description: string;
    issueDate: Date;
    dueDate: Date;
    members: {
        _id: string;
        name: string;
        flatNo: string;
        status: "Paid" | "Pending";
        amountPaid: number;
    }[];
}

const ManagePayments = () => {
    const { user } = useAuth();

    const [payments, setPayments] = useState<Payments[]>([
        {
            _id: "1",
            title: "Maintenance June 2025",
            amount: 500,
            description: "Monthly maintenance charge",
            issueDate: new Date("2025-06-01"),
            dueDate: new Date("2025-06-10"),
            members: [
                { _id: "m1", name: "Amit Kumar", flatNo: "A-101", status: "Paid", amountPaid: 500 },
                { _id: "m2", name: "Sneha Gupta", flatNo: "A-102", status: "Pending", amountPaid: 0 },
            ],
        },
        {
            _id: "2",
            title: "Parking Fee 2025",
            amount: 1000,
            description: "Annual parking maintenance fee",
            issueDate: new Date("2025-05-01"),
            dueDate: new Date("2025-05-20"),
            members: [
                { _id: "m3", name: "Rohan Singh", flatNo: "B-201", status: "Paid", amountPaid: 1000 },
                { _id: "m4", name: "Kavita Joshi", flatNo: "B-202", status: "Pending", amountPaid: 0 },
                { _id: "m5", name: "Kavita Loshi", flatNo: "B-203", status: "Pending", amountPaid: 0 },
                { _id: "m6", name: "Kavita Moshi", flatNo: "B-204", status: "Pending", amountPaid: 0 },
                { _id: "m6", name: "Kavita Moshi", flatNo: "B-204", status: "Pending", amountPaid: 0 },
                { _id: "m6", name: "Kavita Moshi", flatNo: "B-204", status: "Pending", amountPaid: 0 },
            ],
        },
    ]);

    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <div className="flex flex-col h-full py-5 px-6">
            {/* Header */}
            <div className="flex justify-between items-start w-full mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <MdPayments className="text-primary w-6 h-6" />
                        Manage Payments
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        View and manage payment details of your society.
                    </p>
                </div>
            </div>

            {/* Payments List */}
            <div className="space-y-4">
                {payments.map((payment) => (
                    <div
                        key={payment._id}
                        className="border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden"
                    >
                        {/* Card Header */}
                        <div className="flex justify-between items-center px-5 py-4 cursor-pointer hover:bg-slate-50 transition"
                            onClick={() => toggleExpand(payment._id)}
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">
                                    {payment.title}
                                </h3>
                                <p className="text-sm text-slate-500">{payment.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-2">
                                    <span>Amount: ₹{payment.amount}</span>
                                    <span>Issue: {new Date(payment.issueDate).toLocaleDateString()}</span>
                                    <span>Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <button className="text-slate-600 hover:text-slate-900 transition-all">
                                {expanded === payment._id ? (
                                    <FaChevronUp className="w-5 h-5" />
                                ) : (
                                    <FaChevronDown className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Expandable Section */}
                        <div
                            className={`transition-all duration-300 overflow-hidden ${expanded === payment._id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="bg-card border-t border-slate-200 ">
                                {/* <h4 className="text-slate-700 font-medium mb-2">Member Details</h4> */}
                                <div className="overflow-x-auto w-full max-h-64">
                                    <table className="min-w-full bg-card border border-t-0 text-sm">
                                        <thead className="sticky top-0 bg-primary text-card">
                                            <tr className="">
                                                <th className="px-3 py-2 text-left whitespace-nowrap">Sr. No.</th>
                                                <th className="px-3 py-2 text-left whitespace-nowrap">Name</th>
                                                <th className="px-3 py-2 text-left whitespace-nowrap">Flat No.</th>
                                                <th className="px-3 py-2 text-left whitespace-nowrap">Status</th>
                                                <th className="px-3 py-2 text-left whitespace-nowrap">Amount Paid</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payment.members.map((m, i) => (
                                                <tr key={m._id} className={`${i % 2 ? 'bg-primary/5' : 'bg-card'}`}>
                                                    <td className="px-3 py-3">{i + 1}.</td>
                                                    <td className="px-3 py-3 text-nowrap">{m.name}</td>
                                                    <td className="px-3 py-3">{m.flatNo}</td>
                                                    <td className="px-3 py-3">
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-semibold ${m.status === "Paid"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
                                                                }`}
                                                        >
                                                            {m.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-3">₹{m.amountPaid}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManagePayments;
