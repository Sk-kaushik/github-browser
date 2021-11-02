import React, { useState } from "react";

import { useRootContext } from "../../context/RootContext";

import { Tooltip, Modal, Input, Form, notification } from "antd";

const { TextArea } = Input;

const AddButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { addRepo } = useRootContext();

  const [form] = Form.useForm();

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  const openNotification = (type) => {
    notification[type]({
      message: "Repository Added Successfully!",
      duration: "2",
    });
  };

  const saveRepo = () => {
    form
      .validateFields()
      .then((val) => {
        form.resetFields();

        openNotification("success");

        addRepo(val);

        setModalVisible(false);
      })
      .catch((info) => console.log("validation failed", info));
  };

  return (
    <>
      <Tooltip placement="top" title="Add Repository">
        <div className="fab-button" onClick={toggleModal}>
          +
        </div>
      </Tooltip>

      <Modal title="Add New Repository" centered visible={modalVisible} okText="Create new repository" onOk={saveRepo} onCancel={() => setModalVisible(false)}>
        <Form layout="vertical" form={form}>
          <Form.Item
            name="owner"
            label="Owner / Organization"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            name="repoName"
            label="Repository Name"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            name="desc"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddButton;
