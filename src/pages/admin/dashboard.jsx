import React from "react";
import { Link } from "react-router-dom";

function StatCard({ title, value, delta, positive }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="mt-2 flex items-end justify-between">
                <div className="text-2xl font-semibold">{value}</div>
                {delta != null && (
                    <span
                        className={
                            "text-xs px-2 py-1 rounded-md " +
                            (positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")
                        }
                    >
                        {positive ? "+" : ""}
                        {delta}%
                    </span>
                )}
            </div>
        </div>
    );
}

function MiniBarChart() {
    // Simple placeholder bars using divs; replace with chart lib later if needed
    const bars = [40, 60, 35, 80, 55, 70, 50, 65, 40, 75, 60, 85];
    return (
        <div className="flex items-end gap-2 h-40">
            {bars.map((h, i) => (
                <div
                    key={i}
                    className="w-3 rounded-t bg-indigo-500"
                    style={{ height: `${h}%` }}
                />
            ))}
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard title="Total Sales" value="$24,320" delta={12.4} positive />
                <StatCard title="Orders" value="1,284" delta={-2.1} />
                <StatCard title="Customers" value="893" delta={6.3} positive />
                <StatCard title="Revenue" value="$8,742" delta={3.8} positive />
            </div>

            {/* Charts and shortcuts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Sales (Last 12 months)</h3>
                        <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
                            <option>Last 12 months</option>
                            <option>Last 30 days</option>
                            <option>Last 7 days</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <MiniBarChart />
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="font-semibold">Quick actions</h3>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                        <Link
                            to="/admin/products"
                            className="rounded-lg border border-gray-200 p-3 text-center hover:border-indigo-400 hover:text-indigo-600"
                        >
                            Manage Products
                        </Link>
                        <button className="rounded-lg border border-gray-200 p-3 hover:border-indigo-400 hover:text-indigo-600">
                            New Discount
                        </button>
                        <button className="rounded-lg border border-gray-200 p-3 hover:border-indigo-400 hover:text-indigo-600">
                            Add Banner
                        </button>
                        <button className="rounded-lg border border-gray-200 p-3 hover:border-indigo-400 hover:text-indigo-600">
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent orders */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="p-5 border-b border-gray-200">
                    <h3 className="font-semibold">Recent orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500">
                                <th className="px-5 py-3 border-b">Order ID</th>
                                <th className="px-5 py-3 border-b">Customer</th>
                                <th className="px-5 py-3 border-b">Total</th>
                                <th className="px-5 py-3 border-b">Status</th>
                                <th className="px-5 py-3 border-b">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="odd:bg-gray-50">
                                    <td className="px-5 py-3 font-mono">#10{i}23</td>
                                    <td className="px-5 py-3">John Doe</td>
                                    <td className="px-5 py-3">$123.{i}0</td>
                                    <td className="px-5 py-3">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2 py-1 text-xs">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">2025-11-0{i}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}