import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Home from "../Home";

const CMUcallback: React.FC = () => {
  const navigate = useNavigate();
  const { setC_id } = useContext(UserContext); // Access the setC_id function

  useEffect(() => {
    console.log("1234");
    const fetchCMUUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code"); // Extract the 'code' from the URL

      if (code) {
        try {
          // Step 1: Exchange the authorization code for an access token
          console.log("1234");
          const tokenResponse = await fetch(
            "https://oauth.cmu.ac.th/v1/GetToken.aspx",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                code,
                redirect_uri: "http://localhost:3000/cmuOAuthCallback",
                client_id: "xxmT6ZjEmGYG0C3DFxDJTu7rB9N04B4sSyPXng2d",
                client_secret: "pMsFDtR3FyNTWD0cz5r7mvMVNF0BZgryFzvgcCYh", // ⚠️ NEVER expose this in production!
                grant_type: "authorization_code",
              }).toString(),
            }
          );

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;
          console.log(accessToken);
          console.log(tokenData);

          if (accessToken) {
            // Step 2: Use the access token to fetch user info
            const userResponse = await fetch(
              "https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            const userInfo = await userResponse.json();

            if (userInfo.cmuitaccount) {
              // User is registered
              setC_id(userInfo.cmuitaccount); // Save user ID in context
              sessionStorage.setItem("C_id", userInfo.cmuitaccount);

              // Redirect user to the Home page
              navigate("/Home"); // เปลี่ยนหน้าไปยัง Home
            } else {
              // Example: User is not registered
              navigate(`/register`, {
                state: {
                  C_name: userInfo.displayName, // Pass user's display name
                  C_email: userInfo.email, // Pass user's email
                  isOauth: true,
                },
              });
            }
          } else {
            console.error("Failed to get access token");
            navigate("/error");
          }
        } catch (error) {
          console.error("Error during OAuth callback:", error);
          navigate("/error");
        }
      } else {
        console.warn("No authorization code found or login canceled.");
        navigate("/login");
      }
    };

    fetchCMUUser();
  }, [navigate, setC_id]);

  return null; // Render nothing during OAuth callback handling
};

export default CMUcallback;
