import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Welcome to Bill Management</h1>
            <div className="space-x-4">
                <Link
                    to="/upload"
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
                >
                    Upload New Bill
                </Link>
                <Link
                    to="/bills"
                    className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                >
                    View Uploaded Bills
                </Link>
            </div>
        </div>
    );
}
