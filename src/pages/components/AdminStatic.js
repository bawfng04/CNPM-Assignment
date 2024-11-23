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

const AdminStatic = () => {
  const [activeComponent, setActiveComponent] = useState("general");

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
