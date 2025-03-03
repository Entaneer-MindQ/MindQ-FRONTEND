// @ts-ignore
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "../hooks/useNavigation";
import { NavLink } from "../components/nav/NavLink";
import { MenuButton } from "../components/nav/MenuButton";
import { ApiResponse } from "../types/case-view";
import "../styles/global.css";
import { post } from "../services/api";
import { useCookies } from "react-cookie";
import { getUserNavItems, UserNavItem } from "./UserNavItems";
import { getAdminNavItems, AdminNavItem } from "./AdminNavItems";

const Navbar: React.FC = () => {
  const { isLogin, logout, mind_code } = useAuth();
  const navigation = useNavigation();
  const [caseExist, setCaseExist] = useState(false);

  const [cookies] = useCookies(["auth_token"]);
  const authToken = cookies["auth_token"];
  const isAdmin = localStorage.getItem("isAdmin");

  const UserNavItems: UserNavItem[] = getUserNavItems(
    caseExist,
    isLogin,
    mind_code
  );

  const AdminNavItems: AdminNavItem[] = getAdminNavItems(isLogin);

  const temp = localStorage.getItem("isAdmin");
  console.log("from temp", temp);

  // สร้างฟังก์ชันสำหรับจัดการการปิด mobile menu
  const handleNavClick = () => {
    if (navigation.isMobileMenuOpen) {
      navigation.setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const checkCase = async () => {
      try {
        const response = (await post("/api/getCase", {
          token: authToken,
        })) as ApiResponse;

        if (response.data) {
          setCaseExist(true);
        }
      } catch (error) {
        console.error("Error fetching case:", error);
      }
    };

    checkCase();
  }, [authToken]);

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
          {isAdmin === "true"
            ? [
                AdminNavItems.map((item, index) => (
                  <NavLink
                    key={index}
                    item={item}
                    isMobile={true}
                    isActive={navigation.location.pathname === item.path}
                    onLogoutClick={() => navigation.setShowLogoutDialog(true)}
                    showLogoutDialog={navigation.showLogoutDialog}
                    onLogoutDialogClose={() =>
                      navigation.setShowLogoutDialog(false)
                    }
                    onLogoutConfirm={logout}
                    onNavClick={handleNavClick} // เพิ่ม prop ใหม่
                  />
                )),
              ]
            : UserNavItems.map((item, index) => (
                <NavLink
                  key={index}
                  item={item}
                  isMobile={true}
                  isActive={navigation.location.pathname === item.path}
                  onLogoutClick={() => navigation.setShowLogoutDialog(true)}
                  showLogoutDialog={navigation.showLogoutDialog}
                  onLogoutDialogClose={() =>
                    navigation.setShowLogoutDialog(false)
                  }
                  onLogoutConfirm={logout}
                  onNavClick={handleNavClick} // เพิ่ม prop ใหม่
                />
              ))}
        </div>
      </nav>

      {/* Desktop and iPad Pro Sidebar */}
      <nav className="hidden xl:flex fixed left-0 top-0 h-full w-20 md:w-24 bg-[var(--primary-color)] flex-col">
        {isAdmin === "true"
          ? AdminNavItems.map((item, index) => (
              <NavLink
                key={index}
                item={item}
                isActive={navigation.location.pathname === item.path}
                onLogoutClick={() => navigation.setShowLogoutDialog(true)}
                showLogoutDialog={navigation.showLogoutDialog}
                onLogoutDialogClose={() =>
                  navigation.setShowLogoutDialog(false)
                }
                onLogoutConfirm={logout}
              />
            ))
          : UserNavItems.map((item, index) => (
              <NavLink
                key={index}
                item={item}
                isActive={navigation.location.pathname === item.path}
                onLogoutClick={() => navigation.setShowLogoutDialog(true)}
                showLogoutDialog={navigation.showLogoutDialog}
                onLogoutDialogClose={() =>
                  navigation.setShowLogoutDialog(false)
                }
                onLogoutConfirm={logout}
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
