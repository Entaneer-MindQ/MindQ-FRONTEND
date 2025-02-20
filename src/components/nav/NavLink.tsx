import React from "react";
import { Link } from "react-router-dom";
import { NavItem } from "../../types/logout";
import { LogoutDialog } from "./LogoutDialog";
import "../../styles/global.css";

interface NavLinkProps {
  item: NavItem;
  isMobile?: boolean;
  isActive: boolean;
  onLogoutClick?: () => void;
  showLogoutDialog?: boolean;
  onLogoutDialogClose?: () => void;
  onLogoutConfirm?: () => void;
  onNavClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  item,
  isMobile = false,
  isActive,
  onLogoutClick,
  showLogoutDialog = false,
  onLogoutDialogClose,
  onLogoutConfirm,
  onNavClick,
}) => {
  const iconWrapperClasses = `flex items-center justify-center ${
    isMobile ? "w-6" : "w-6 h-6"
  }`;

  if (item.label === "Logout") {
    return (
      <>
        <button
          onClick={() => {
            onLogoutClick?.();
            onNavClick?.();
          }}
          className={`
            p-4 flex items-center justify-center w-full
            transition-all duration-200
            bg-[var(--primary-color)] text-white
            hover:bg-[var(--hover-color)] focus:outline-none
            ${isMobile ? "flex-row space-x-3" : "flex-col space-y-1"}
          `}
        >
          <div className={iconWrapperClasses}>{item.icon}</div>
          <span className="text-sm">{item.label}</span>
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
      onClick={onNavClick}
      className={`
        p-4 flex items-center justify-center w-full
        transition-all duration-200
        ${
          isActive && item.label
            ? "bg-[var(--active-color)] text-white"
            : "text-white hover:bg-[var(--hover-color)]"
        }
        ${isMobile ? "flex-row space-x-3" : "flex-col space-y-1"}
      `}
    >
      <div className={iconWrapperClasses}>{item.icon}</div>
      {item.label && <span className="text-sm">{item.label}</span>}
    </Link>
  );
};
