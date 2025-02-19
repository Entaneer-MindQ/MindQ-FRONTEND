import AdviseeHistory from "./components/admin_history";

const Admin_History_page = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <div className="text-center font-bold text-lg">All User</div>
          <AdviseeHistory />
        </div>
      </div>
    </div>
  );
};

export default Admin_History_page;
