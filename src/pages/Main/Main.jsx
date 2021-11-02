import React from "react";
import { useHistory, useParams } from "react-router";

import { Branches, Issues, Sidebar, Header } from "../../components";

import { useRootContext } from "../../context/RootContext";

import { Button, Tabs, notification } from "antd";

const { TabPane } = Tabs;

const Main = () => {
  const { repo_name } = useParams();

  const { deleteRepo } = useRootContext();

  const history = useHistory();

  const handleDelete = () => {
    deleteRepo(repo_name);
    openNotification("success");
    history.push("/");
  };

  const openNotification = (type) => {
    notification[type]({
      message: "Repository Deleted Successfully!",
      duration: "2",
    });
  };

  return (
    <>
      <Header title={"Github Browser"} />
      <div className="container">
        <Sidebar />

        <main style={{ position: "relative" }}>
          <div className="main-head">
            <Button
              size="large"
              style={{ background: "#00173d", color: "white" }}
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </Button>
          </div>
          <div className="main-container">
            <Tabs type="card">
              <TabPane tab="Branches" key="1" className="tab">
                <Branches />
              </TabPane>
              <TabPane tab="Issues" key="2" className="tab">
                <Issues />
              </TabPane>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
