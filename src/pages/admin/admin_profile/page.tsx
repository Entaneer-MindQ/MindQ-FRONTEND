import ProfileBox from "./components/RequestBoxes";

const Admin_Profile = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <div style={{ padding: "30px", fontSize: "30px" }}>Request Form</div>
        <ProfileBox></ProfileBox>
      </div>
    </div>
  );
};

export default Admin_Profile;
