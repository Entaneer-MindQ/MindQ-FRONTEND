import React from "react";
import { Link } from "react-router-dom";
import { NavItem } from "../../types/logout";
import { LogoutDialog } from "./LogoutDialog";

interface NavLinkProps {
  item: NavItem;
  isMobile?: boolean;
  isActive: boolean;
  onLogoutClick?: () => void;
  showLogoutDialog?: boolean;
  onLogoutDialogClose?: () => void;
  onLogoutConfirm?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  item,
  isMobile = false,
  isActive,
  onLogoutClick,
  showLogoutDialog = false,
  onLogoutDialogClose,
  onLogoutConfirm,
}) => {
  if (item.label === "Logout") {
    return (
      <>
        <button
          onClick={onLogoutClick}
          className={`
            p-4 flex items-center justify-center w-full
            transition-all duration-200 bg-[#943131] text-white
            hover:bg-[#B33D3D]
            ${isMobile ? "flex-row" : "flex-col"}
          `}
        >
          {item.icon}
          <span className={`text-sm ${isMobile ? "ml-3" : "mt-1"}`}>
            {item.label}
          </span>
        </button>

        {showLogoutDialog && (
          <LogoutDialog
            isOpen={showLogoutDialog}
            onClose={onLogoutDialogClose!}
            onConfirm={onLogoutConfirm!}
          />
        )}
      </>
    );
  }

  return (
    <Link
      to={item.path}
      className={`
        p-4 flex items-center justify-center w-full
        transition-all duration-200
        ${
          isActive && item.label
            ? "bg-[#FFE3E3] text-black"
            : "text-white hover:bg-[#B33D3D]"
        }
        ${isMobile ? "flex-row" : "flex-col"}
      `}
    >
      {item.icon}
      {item.label && (
        <span className={`text-sm ${isMobile ? "ml-3" : "mt-1"}`}>
          {item.label}
        </span>
      )}
    </Link>
  );
};
