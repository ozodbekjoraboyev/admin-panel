import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";
import useMyStor from "../my-stor";
import { use } from "react";
function LoginPage() {
  const [loading, setloading] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className=" shadow-blue-600 shadow-2xl w-[400px]  ">
        <Form
          onFinish={(valus) => {
            console.log(valus);

            setloading(true);
            axios
              .post("https://library.softly.uz/auth/signin", valus)
              .then((res) => {
                console.log(res.data);
                useMyStor.setState({
                  token: res.data.token,
                  user: res.data.user,
                });
                setloading(false);
            localStorage.setItem("auth", JSON.stringify(res.data))
              })
              .catch((e) => {
                console.error(e);
                setloading(false);
              });
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "logini krit",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Parolni kirit",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
