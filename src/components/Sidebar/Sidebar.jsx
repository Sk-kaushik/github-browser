import React, { useState } from "react";

import { AddButton, ListItem } from "../index";

import { useRootContext } from "../../context/RootContext";
import { Button } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);

  const { repoList } = useRootContext();

  const toggleSidebar = () => {
    setSidebarVisibility(!sidebarVisibility);
  };

  return (
    <>
      <Button className="hamburger" onClick={toggleSidebar} ghost>
        <MenuUnfoldOutlined />
      </Button>

      <aside className={sidebarVisibility ? "show-sidebar" : ""}>
        {repoList && repoList.map((item) => <ListItem key={item.id} id={item.id} item={item} />)}

        <div className="fab-position">
          <AddButton />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
