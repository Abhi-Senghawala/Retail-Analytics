import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Users, Upload, LogOut } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/customers", icon: Users, label: "Customers" },
    { to: "/upload", icon: Upload, label: "Upload" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-800 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-bold text-blue-800 dark:text-blue-400">
                Retail
                <span className="text-yellow-600 dark:text-yellow-400">
                  Analytics
                </span>
              </h1>
            </div>
            <nav className="mt-6 space-y-1 px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <button
              onClick={logout}
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
