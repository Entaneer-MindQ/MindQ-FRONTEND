import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useNavigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  return {
    location,
    isMobileMenuOpen,
    showLogoutDialog,
    setIsMobileMenuOpen,
    setShowLogoutDialog,
    toggleMobileMenu: () => setIsMobileMenuOpen(!isMobileMenuOpen),
  };
};
