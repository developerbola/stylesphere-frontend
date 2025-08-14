import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ListTree, Menu, Package, Users, X } from "lucide-react";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 block lg:hidden p-2 rounded-md bg-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed lg:static top-0 left-0 h-screen w-56 p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white z-99`}
      >
        <div className="mb-6">
          <Link to={"/"}>
            <button className="flex items-center gap-1 cursor-pointer">
              <ChevronLeft size={20} /> Back
            </button>
          </Link>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-[#f5f5f5] rounded-sm transition flex items-center gap-[6px]"
          >
            <Users size={20} /> Users
          </Link>
          <Link
            to="/dashboard/products"
            className="p-2 hover:bg-[#f5f5f5] rounded-sm transition flex items-center gap-[6px]"
          >
            <Package size={20} /> Products
          </Link>
          <Link
            to="/dashboard/categories"
            className="p-2 hover:bg-[#f5f5f5] rounded-sm transition flex items-center gap-[6px]"
          >
            <ListTree size={20} />
            Categories
          </Link>
        </nav>
      </div>

      {/* Background Overlay when Sidebar is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 blur-md bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default DashboardSidebar;
