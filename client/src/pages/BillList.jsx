import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BillList() {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/bills").then((res) => setBills(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6">Uploaded Bills</h1>
            <Link to="/" className="text-blue-600 underline">
                ⬅ Back to Home
            </Link>
            <div className="mt-6 overflow-x-auto">
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Bill Date</th>
                            <th className="border px-4 py-2">File</th>
                            <th className="border px-4 py-2">Uploaded At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => (
                            <tr key={bill._id}>
                                <td className="border px-4 py-2">{bill.name}</td>
                                <td className="border px-4 py-2">₹{bill.amount}</td>
                                <td className="border px-4 py-2">{bill.description}</td>
                                <td className="border px-4 py-2">
                                    {new Date(bill.billDate).toLocaleDateString()}
                                </td>
                                <td className="border px-4 py-2">
                                    <a
                                        href={bill.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View File
                                    </a>
                                </td>
                                <td className="border px-4 py-2">
                                    {new Date(bill.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
