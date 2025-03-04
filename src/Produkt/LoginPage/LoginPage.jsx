import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";
import useMyStor from "../../my-stor";
import { use } from "react";
import UserPeg from "../Kitobxonlar/UserPeg";
import Password from "antd/es/input/Password";
import api from "../../api/api";
function LoginPage() {
  const [loading, setloading] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className=" w-[400px]  ">
        <Form
          layout="vertical"
          initialValues={{
            username: "lib2",
            password: "lib22",
          }}
          onFinish={(valus) => {
            console.log(valus);

            setloading(true);
            api
              .post("/auth/signin", valus)
              .then((res) => {

                api.defaults.headers.Authorization = `Bearer ${res.data.token}`;

                console.log(res.data);
                useMyStor.setState({
                  token: res.data.token,
                  user: res.data.user,
                });
                setloading(false);
                localStorage.setItem("auth", JSON.stringify(res.data));
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
