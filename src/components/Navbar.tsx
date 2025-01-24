import React from "react";
import UserProfile from "../types/user";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import responseData from "../types/response";
import { post } from "../services/api";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface ApiResponse {
  status: number;
  data: {
    cmuBasicInfo: responseData;
  };
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const [cookies, _] = useCookies(["auth_token"]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  console.log(userProfile?.personalID);
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Log the token being sent
      console.log("Sending cookies:", cookies);

      try {
        const response = (await post("/api/user/profile", {
          token: cookies["auth_token"],
        })) as ApiResponse;
        if (response.status === 200 && response.data?.cmuBasicInfo) {
          const basicInfo = response.data.cmuBasicInfo;
          const name = basicInfo.firstname_TH.concat(
            " ",
            basicInfo.lastname_TH
          );
          setUserProfile({
            personalID: basicInfo.student_id,
            email: basicInfo.cmuitaccount,
            faculty: basicInfo.organization_name_TH,
            major: basicInfo.organization_name_EN,
            degree: basicInfo.organization_code,
            role: basicInfo.itaccounttype_TH,
            name: name,
            name_EN: basicInfo.cmuitaccount_name,
          });
          console.log("Updated userProfile:", response.data);
        } else if (response.status === 404) {
          // setError(response.message || "No cases found");
          console.log("No user profile found");
        }
      } catch (error) {
        console.error("Error details:", {
          message: (error as any).message,
          response: (error as any).response?.data,
          status: (error as any).response?.status,
        });
      }
    };

    // Call the fetch function
    fetchUserProfile();
  }, [cookies["auth_token"]]); // Re-run if the cookie changes

  const navItems: NavItem[] = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: "Account",
      path: "/account",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Home",
      path: "/",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
      ),
      label: "New",
      path: "/case-open",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      label: "Cases",
      path: "/case",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      label: "Calendar",
      path: "/calendar",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      label: "History",
      path: "/history",
    },
    ...(userProfile?.personalID === "650610749"
      ? [
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            ),
            label: "Request",
            path: "/admin-request",
          },
        ]
      : []),
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 bg-[#943131] flex flex-col">
      <img
        src="src\utils\IMG_0363 1.png"
        alt="Logo"
        style={{
          width: "80%",
          marginLeft: "7px",
          marginBottom: "7px",
          marginTop: "7px",
        }}
      />
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`
            p-4 flex flex-col items-center justify-center
            transition-all duration-200
            ${
              location.pathname === item.path && item.label !== ""
                ? "bg-[#FFE3E3] text-black"
                : "text-white hover:bg-[#B33D3D] hover:text-white"
            }
          `}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
