import React from "react";

import { Avatar, Typography } from "antd";
import { GithubOutlined, BranchesOutlined } from "@ant-design/icons";

const Header = (props) => {
  return (
    <div className="head-bar">
      <Avatar icon={props.title.match("Github") ? <GithubOutlined /> : <BranchesOutlined />} size={"large"} style={{ background: "transparent" }} />
      <Typography.Title style={{ textTransform: "uppercase" }} level={4}>
        {props.title}
      </Typography.Title>
    </div>
  );
};

export default Header;
