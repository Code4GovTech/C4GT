import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content and navbar container */}
      <div className="flex-1 flex">
        {/* Main content area */}
        <main className="flex-1 p-8 overflow-auto animate-fadeIn">
          {children}
        </main>

        {/* Right-side navbar */}
        <nav className="w-64 bg-gray-800 text-white p-6 flex flex-col animate-slideInRight">
          <div className="mb-8">
            <h1 className="text-xl font-bold mb-4">Sunbird Framework</h1>
          </div>

          <ul className="flex-1 space-y-2">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gray-700 rounded-lg"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="block px-4 py-2 hover:bg-gray-700 rounded-lg"
              >
                Create Framework
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-6 text-center">
        © {new Date().getFullYear()} Sunbird Framework UI
      </footer>
    </div>
  );
};

export default Layout;
