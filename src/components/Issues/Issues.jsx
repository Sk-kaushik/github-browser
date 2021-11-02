import React, { useEffect } from "react";
import { useParams } from "react-router";

import { Item } from "../";

import { Avatar, Empty, Spin, Typography } from "antd";

import { useRootContext } from "../../context/RootContext";

const Issues = () => {
  const { getIssues, issuesList, loading } = useRootContext();

  const { repo_name } = useParams();
  useEffect(() => {
    getIssues(repo_name);
  }, [repo_name, getIssues]);

  return (
    <div>
      {loading ? (
        <div className="center-container">
          <Spin />
        </div>
      ) : (
        <>
          {issuesList && issuesList.length > 0 ? (
            issuesList.map((item) => (
              <Item key={item.id}>
                <Typography.Title level={5}>{item?.title}</Typography.Title>

                <div className="issue-avatar-container">
                  <Avatar style={{ marginRight: "10px" }} src={item?.user?.avatar_url} size="small" />
                  {item?.user?.login}
                </div>
              </Item>
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

export default Issues;
