import React from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Welcome back, {user?.email || "User"}
        </h2>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
