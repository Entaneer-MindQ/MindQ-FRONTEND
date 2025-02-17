import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "../hooks/useNavigation";
import { NavLink } from "../components/nav/NavLink";
import { MenuButton } from "../components/nav/MenuButton";
import { NavItem } from "../types/nav";
import "../styles/global.css";

const Navbar: React.FC = () => {
  const { userProfile, isLogin, logout } = useAuth();
  const navigation = useNavigation();

  // สร้างฟังก์ชันสำหรับจัดการการปิด mobile menu
  const handleNavClick = () => {
    if (navigation.isMobileMenuOpen) {
      navigation.setIsMobileMenuOpen(false);
    }
  };
  const navItems: NavItem[] = [
    {
      icon: (
        <img
          src="src/utils/IMG_0363 1.png"
          alt="Logo"
          className="w-full h-auto max-w-[40px] sm:max-w-[48px] mx-auto"
        />
      ),
      label: "",
      path: "/home",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mx-auto"
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
          className="w-6 h-6 mx-auto"
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
      path: "/home",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mx-auto"
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
          className="w-6 h-6 mx-auto"
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
          className="w-6 h-6 mx-auto"
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
    ...(userProfile?.personalID === "650610749" && isLogin
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
    ...(isLogin
      ? [
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H3"
                />
              </svg>
            ),
            label: "Logout",
            path: "/logout",
          },
        ]
      : []),
  ];
  return (
    <>
      {/* Mobile Menu Button */}
      <MenuButton
        isOpen={navigation.isMobileMenuOpen}
        onClick={navigation.toggleMobileMenu}
        className="xl:hidden"
      />

      {/* Mobile and Regular iPad Menu */}
      <nav
        className={`
          xl:hidden fixed top-0 left-0 w-64 md:w-72 h-full bg-[var(--primary-color)]
          transform transition-transform duration-300 ease-in-out z-40
          ${navigation.isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full pt-16 md:pt-20">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              item={item}
              isMobile={true}
              isActive={navigation.location.pathname === item.path}
              onLogoutClick={() => navigation.setShowLogoutDialog(true)}
              showLogoutDialog={navigation.showLogoutDialog}
              onLogoutDialogClose={() => navigation.setShowLogoutDialog(false)}
              onLogoutConfirm={logout}
              onNavClick={handleNavClick} // เพิ่ม prop ใหม่
            />
          ))}
        </div>
      </nav>

      {/* Desktop and iPad Pro Sidebar */}
      <nav className="hidden xl:flex fixed left-0 top-0 h-full w-20 md:w-24 bg-[var(--primary-color)] flex-col">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            item={item}
            isActive={navigation.location.pathname === item.path}
            onLogoutClick={() => navigation.setShowLogoutDialog(true)}
            showLogoutDialog={navigation.showLogoutDialog}
            onLogoutDialogClose={() => navigation.setShowLogoutDialog(false)}
            onLogoutConfirm={logout}
            // ไม่จำเป็นต้องส่ง onNavClick ให้กับ desktop version
          />
        ))}
      </nav>

      {/* Overlay */}
      {navigation.isMobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => navigation.setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
