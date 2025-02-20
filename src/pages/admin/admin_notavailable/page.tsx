import NotAvailableTimeForm from "./component/notavailabletimeForm";
import "./component/style.css";

const AdminNotAvailablePage: React.FC = () => {
  return (
    <div className="admin-page">
      <h1 className="title">จัดการเวลาที่ไม่พร้อม</h1>
      <NotAvailableTimeForm />
    </div>
  );
};

export default AdminNotAvailablePage;
