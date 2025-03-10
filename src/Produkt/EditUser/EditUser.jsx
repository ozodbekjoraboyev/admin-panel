import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "../../my-stor";
import api from "../../api/api";

function EditUser({ ozgarish, user, setuser,  }) {
  const [loading, setloading] = useState(false);

  const state = useMyStor();

  return (
    <div>
      <Drawer
        title="Kitobxon o'zgartrish"
        open={user ? true : false}
        onClose={() => setuser(null)}
        destroyOnClose
      >
        <Form
          initialValues={user}
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            setloading(true);
            api
              .put(
                `/api/users/${user.id}`,
                { ...values, phone: values.phone.toString() },
                {
               
                }
              )
              .then((res) => {
                console.log(res.data);
                message.success("Foydalanuvchi muvaffaqiyatli qo‘shildi!");
                setuser(null);
                ozgarish?.();
              })
              .catch((err) => {
                console.error(err);
                message.error("Xatolik yuz berdi!");
              })
              .finally(() => {
                setloading(false);
              });
          }}
        >
          <Form.Item
            label="Ism"
            name="firstName"
            rules={[
              { required: true, message: "Iltimos, ismingizni kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="familya"
            name="lastName"
            rules={[{ required: true, message: "Iltimos, familya kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefon raqam"
            name="phone"
            rules={[
              {
                required: true,
                message: "Iltimos, telefon raqamni  kiriting!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>{" "}
          <Form.Item>
            <Radio.Group
              block
              options={[
                {
                  label: "Erkak",
                  value: "male",
                },
                {
                  label: "Ayol",
                  value: "fimale",
                },
              ]}
              optionType="button"
              buttonStyle="solid"
              rules={[
                {
                  required: true,
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
       
              type="primary"
              htmlType="submit"
            >
              {loading ? "Jonatilmoqda" : "+ O'zgartrish"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default EditUser;
