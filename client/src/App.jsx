import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadBill from "./pages/UploadBill";
import BillList from "./pages/BillList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadBill />} />
        <Route path="/bills" element={<BillList />} />
      </Routes>
    </BrowserRouter>
  );
}
