import React, { useState } from "react";
import { Input } from "antd";
import { Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import socket from "../config";

function CreateRoom() {
  const [name, setName] = useState("");
  const style = {
    button: {
      margin: 20,
    },
  };

  const onChange = (e) => {
    const { value } = e.target;
    setName(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("create-game", name);
  };

  return (
    <Row>
      <Col span={24}>
        <h1>Create Room</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <Input
            onChange={onChange}
            size="large"
            placeholder="Input Name Or Nickname"
            prefix={<UserOutlined />}
          />
          <Button htmlType="submit" style={style.button}>
            Submit
          </Button>
        </form>
      </Col>
    </Row>
  );
}

export default CreateRoom;
