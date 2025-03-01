import Admin_appointment from "./components/admin_appointment";

const AdminExport = () => {
  // return (
  //   <div className="min-h-screen w-full">
  //     <div className="container mx-auto px-4 flex justify-center items-center">
  //       <div className="w-full max-w-4xl">
  //         <div className="text-center font-bold text-lg">All User</div>
  //         <Admin_appointment/>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <div className="text-center font-bold text-lg">All User</div>
          <Admin_appointment/>
        </div>
      </div>
    </div>
  );
};

export default AdminExport;
