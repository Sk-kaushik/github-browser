import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useRootContext } from "../../context/RootContext";
import Header from "../../components/Header/Header";
import Item from "../../components/ListItem/Item";
import { Avatar, Spin, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import moment from "moment";

const Commit = () => {
  const { repo_name, branch_name } = useParams();

  const { getCommits, commitsList, loading } = useRootContext();

  useEffect(() => {
    getCommits(repo_name, branch_name);
  }, [repo_name, branch_name, getCommits]);

  return (
    <>
      <Header title={`Commits ${branch_name}`} />
      {loading ? (
        <div className="center-container">
          <Spin />
        </div>
      ) : (
        <>
          <div className="commit-container ">
            {commitsList &&
              commitsList.map((item) => (
                <Item key={item.node_id}>
                  <Typography.Text className="commit-date"> {moment(item.commit.author.date).format(" DD MMMM YYYY")}</Typography.Text>
                  <Typography.Text className="commit-message"> {item.commit.message}</Typography.Text>
                  <div className="commit-avatar-container">
                    <Avatar style={{ marginRight: "10px", background: "#bfbfbf  " }} src={item?.author?.avatar_url ? item?.author?.avatar_url : <UserOutlined />} size="small" />
                    {item.commit.author.name}
                  </div>
                </Item>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Commit;
