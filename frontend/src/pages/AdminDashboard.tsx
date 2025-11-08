import React, { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  CreditCard,
  Settings,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FormData {
  fullName: string;
  email: string;
  unitNumber: string;
  nominationDate: string;
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}

interface PaymentDataPoint {
  month: string;
  value1: number;
  value2: number;
}

export default function TreasurerDashboard() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    unitNumber: "",
    nominationDate: "",
  });

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    setForm({ fullName: "", email: "", unitNumber: "", nominationDate: "" });
  };

  const paymentData: PaymentDataPoint[] = [
    { month: "11a", value1: 100, value2: 120 },
    { month: "15a", value1: 150, value2: 140 },
    { month: "Jul", value1: 200, value2: 180 },
    { month: "Aug", value1: 250, value2: 220 },
    { month: "Sep", value1: 300, value2: 260 },
    { month: "10a", value1: 350, value2: 300 },
    { month: "10b", value1: 400, value2: 350 },
    { month: "11b", value1: 450, value2: 380 },
  ];

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Users, label: "Members" },
    { icon: Briefcase, label: "Societies" },
    { icon: FileText, label: "Members" },
    { icon: CreditCard, label: "Payments" },
    { icon: CreditCard, label: "Payments" },
    { icon: Settings, label: "Settings" },
  ];

  const quickStats = [
    { label: "Quick Overview", sublabel: "2019 / 2025", value: "150" },
    { label: "Total Contributers", sublabel: "In house", value: "$2,000" },
    { label: "Total Collected", sublabel: "Per month", value: "$2,000" },
    { label: "Pending Payments", sublabel: "In queue", value: "$10000" },
  ];

  const paymentAlerts = [
    { type: "Reminder", name: "John Smith", dueDate: "Due Nov 15", icon: "🔔" },
    { type: "Reminder", name: "Jatin Due", dueDate: "Due Nov 30", icon: "🔔" },
    { type: "Alert", name: "ByAv", dueDate: "Due Nov 30", icon: "🔔" },
    {
      type: "Alert",
      name: "Group D Approval",
      sublabel: "Palaced",
      icon: "🔔",
      dueDate: "",
    },
  ];

  return (
    <div className=" h-screen bg-gray-50">
{/* Main Content */}
      {/* <div className="flex-1 flex flex-col overflow-hidden">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
        </div> */}

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            {/* Quick Overview Stats */}
            <div className="grid grid-cols-4 gap-4">
              {quickStats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm">
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{stat.sublabel}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-6">
              {/* Payment Analysis Chart */}
              <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Analysis
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={paymentData}>
                    <defs>
                      <linearGradient
                        id="colorGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                    />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value1"
                      stroke="#10b981"
                      fill="url(#colorGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="value2"
                      stroke="#ef4444"
                      fill="none"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            {/* Upcoming Alerts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Upcoming Payment Alerts
              </h2>
              <div className="space-y-3">
                {paymentAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{alert.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {alert.type}: {alert.name}
                        </p>
                        {alert.sublabel && (
                          <p className="text-xs text-gray-500">
                            {alert.sublabel}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {alert.dueDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}