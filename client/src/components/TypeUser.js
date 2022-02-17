import React, { useState, useEffect, useRef } from "react";
import socket from "../config";
import { Form, Input, Button, Checkbox } from "antd";

function TypeUser({ isOpen, isOver, gameId }) {
  const [input, setInput] = useState("");
  const textInput = useRef();

  useEffect(() => {
    if (!isOpen) {
      ref.current.focus();
    }
  }, []);
  const resetForm = () => {
    setInput("");
  };

  const onChange = (e) => {
    let value = e.target.value;
    let lastChar = value.charAt(value.length - 1);
    if (lastChar === " ") {
      socket.emit("userInput", {
        input,
        gameId,
      });
      resetForm();
    } else {
      setInput(e.target.value);
    }
  };

  return (
    <div className="">
      <div></div>
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Input
            type="text"
            size="large"
            placeholder="Input Text Here"
            readOnly={isOpen || isOver}
            value={input}
            onChange={(e) => onChange(e)}
            ref={textInput}
          ></Input>
          {/* <Form.Item
            label="Username"
            name="username"
            readOnly={isOpen || isOver}
            value={input}
            ref={textInput}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          {/* <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </div>
      <div></div>
    </div>
  );
}

export default TypeUser;
