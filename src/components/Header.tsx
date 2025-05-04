import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skin Diseases", path: "/skin-disease" },
    { name: "Check Your Skin", path: "/skin-check", requiresAuth: true },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-diagnosphere-dark/80 backdrop-blur-lg border-b border-diagnosphere-primary/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/logo2.png"
              alt="Diagnosphere Logo"
              className="h-20 mr-2"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(
              (item) =>
                (!item.requiresAuth || isAuthenticated) && (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      isActive(item.path)
                        ? "bg-diagnosphere-primary/20 text-diagnosphere-primary font-medium"
                        : "text-diagnosphere-light/80 hover:text-diagnosphere-light hover:bg-diagnosphere-primary/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
            )}
          </nav>

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <Button size="sm" asChild>
                  <Link to="/dashboard">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-diagnosphere-light/80 hover:text-diagnosphere-light hover:bg-diagnosphere-primary/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden py-4 px-6 bg-diagnosphere-dark/95 backdrop-blur-lg border-b border-diagnosphere-primary/30"
        >
          <nav className="flex flex-col space-y-1 mb-4">
            {navItems.map(
              (item) =>
                (!item.requiresAuth || isAuthenticated) && (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-md transition-colors ${
                      isActive(item.path)
                        ? "bg-diagnosphere-primary/20 text-diagnosphere-primary font-medium"
                        : "text-diagnosphere-light/80 hover:text-diagnosphere-light hover:bg-diagnosphere-primary/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
            )}
          </nav>
          <div className="flex flex-col space-y-2 pt-4 border-t border-diagnosphere-primary/30">
            {isAuthenticated ? (
              <>
                <Button asChild>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    Sign up
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Log in
                  </Link>
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
