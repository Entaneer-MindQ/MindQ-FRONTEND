import React from "react";
import "../../styles/global.css";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  isOpen,
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`xl:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[var(--primary-color)] text-white hover:bg-[var(--hover-color)] ${className}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {isOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  </button>
);
