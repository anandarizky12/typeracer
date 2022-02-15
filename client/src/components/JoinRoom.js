import React, { useState } from "react";
import { Input } from "antd";
import { Row, Col } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Button } from "antd";
import socket from "../config";

function JoinRoom() {
  const [state, setState] = useState({ gameId: "", nickname: "" });
  const style = {
    button: {
      margin: 20,
    },
    input: {
      margin: 10,
    },
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("join-game", state);
  };

  return (
    <Row>
      <Col span={24}>
        <h1>Join Room</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <Input
            style={style.input}
            name="gameId"
            onChange={onChange}
            value={state.gameId}
            size="large"
            placeholder="Input Game Id"
            prefix={<KeyOutlined />}
          />
          <Input
            style={style.input}
            name="nickname"
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

export default JoinRoom;
