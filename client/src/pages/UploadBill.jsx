import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadBill() {
    const [form, setForm] = useState({
        name: "",
        amount: "",
        description: "",
        billDate: "",
    });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !file || !form.amount || !form.billDate)
            return alert("Please fill all required fields");

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("amount", form.amount);
        formData.append("description", form.description);
        formData.append("billDate", form.billDate);
        formData.append("file", file);

        await axios.post("http://localhost:5000/api/bills", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Bill uploaded successfully!");
        navigate("/bills");
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6">Upload Bill</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
            >
                <div>
                    <label className="block mb-1 font-medium">Name *</label>
                    <input
                        name="name"
                        className="border p-2 w-full rounded"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Amount (₹) *</label>
                    <input
                        name="amount"
                        className="border p-2 w-full rounded"
                        type="number"
                        value={form.amount}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        className="border p-2 w-full rounded"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Bill Date *</label>
                    <input
                        name="billDate"
                        className="border p-2 w-full rounded"
                        type="date"
                        value={form.billDate}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Bill File *</label>
                    <input
                        className="border p-2 w-full rounded"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}
