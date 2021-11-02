import React, { useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

import { Item } from "../";

import { useRootContext } from "../../context/RootContext";

import { Avatar, Empty, Spin, Typography } from "antd";
import { BranchesOutlined } from "@ant-design/icons";

const Branches = () => {
  const { getBranches, branchesList, loading } = useRootContext();

  const { repo_name } = useParams();
  const location = useLocation();

  useEffect(() => {
    getBranches(repo_name);
  }, [repo_name, getBranches]);

  return (
    <div>
      {loading ? (
        <div className="center-container">
          <Spin />
        </div>
      ) : (
        <>
          {branchesList && branchesList.length > 0 ? (
            branchesList.map((item) => (
              <NavLink to={`${location.pathname}/commit/${item.name}`} key={item.commit.sha}>
                <Item>
                  <div className="branch">
                    <Avatar icon={<BranchesOutlined />} size="large" />
                    <Typography.Title level={5}>{item.name}</Typography.Title>
                  </div>
                </Item>
              </NavLink>
            ))
          ) : (
            <div className="center-container">
              <Empty />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Branches;
