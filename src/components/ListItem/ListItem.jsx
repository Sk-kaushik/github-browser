import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useRootContext } from "../../context/RootContext";

import { Avatar, Tooltip, Typography } from "antd";
import { FolderOpenOutlined } from "@ant-design/icons";

const ListItem = (props) => {
  const [isActive, setIsActive] = useState(false);

  const { getBranches } = useRootContext();

  const repoName = props.item.full_name.split("/")[1];
  const repoDescription = props.item.description;

  const handleToggle = () => {
    setIsActive(!isActive);
    getBranches(repoName);
    // props.toggleSidebar();
  };

  return (
    <>
      <NavLink to={`/repo/${repoName}`} activeClassName="toggle-repo">
        <Tooltip title={repoDescription} placement="bottom">
          <div className={`list-item-container `} onClick={handleToggle}>
            <div className="list-item_left">
              <Avatar src={<FolderOpenOutlined />} />
            </div>

            <div className="list-item_right">
              <Typography.Title level={5}>{repoName}</Typography.Title>
              <Typography.Text>{repoDescription}</Typography.Text>
            </div>
          </div>
        </Tooltip>
      </NavLink>
    </>
  );
};

export default ListItem;
