import React, { useState, useEffect } from "react";
import "./Static.css";
//sidebar and header
import AdminSidebar from "./Sidebar/AdminSidebar";
import AdminHeader from "./Sidebar/AdminHeader";

//admin pages
import General from "./Cards-Admin/GeneralComponent/General";
import Config from "./Cards-Admin/ConfigComponent/Config";
import ManageUser from "./Cards-Admin/ManageUser/ManageUser";
import ManagePrinter from "./Cards-Admin/ManagePrinter/ManagePrinter";
import { useNavigate } from "react-router-dom";

const AdminStatic = () => {
  const [activeComponent, setActiveComponent] = useState("general");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeComponent) {
      case "general":
        return <General />;
      case "config":
        return <Config />;
      case "manageUser":
        return <ManageUser />;
      case "managePrinter":
        return <ManagePrinter />;
      default:
        return <General />;
    }
  };

  //check user role
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    if (role === "user") {
      window.location.href = "/main/unauthorized";
    }
  }, [navigate]);

  // Re-animation when changing component
  useEffect(() => {
    const contentDiv = document.querySelector(".content");
    contentDiv.classList.add("replaceCard");
    const handleAnimationEnd = () => {
      contentDiv.classList.remove("replaceCard");
    };
    contentDiv.addEventListener("animationend", handleAnimationEnd);
    return () => {
      contentDiv.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [activeComponent]);

  return (
    <div className="static">
      <AdminSidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <div className="main-content">
        <AdminHeader
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <div className="content" key={activeComponent}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminStatic;
