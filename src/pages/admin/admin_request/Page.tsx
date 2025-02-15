import CaseBox from "./components/RequestBoxes";

const Admin_Request = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <div style={{ padding: "30px", fontSize: "30px" }}>Request Form</div>
        <CaseBox></CaseBox>
      </div>
    </div>
  );
};

export default Admin_Request;
