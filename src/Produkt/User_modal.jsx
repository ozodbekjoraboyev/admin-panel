import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "../my-stor";

function UserModal({ozgarish}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setloading] = useState(false);

  const state = useMyStor();

  return (
    <div>
      <Button type="primary" onClick={() => setIsOpenModal(true)}>
        + Qo'shish
      </Button>

      <Drawer
        title="Kitobxon qo'shish"
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            setloading(true); // Loadingni yoqish
            axios
              .post(
                `https://library.softly.uz/api/users`,
                { ...values, phone: values.phone.toString() },
                {
                  headers: {
                    authorization: `Bearer ${state.token}`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
                message.success("Foydalanuvchi muvaffaqiyatli qo‘shildi!");
                setIsOpenModal(false); // Modalni yopish
                ozgarish?.()
              })
              .catch((err) => {
                console.error(err);
                message.error("Xatolik yuz berdi!");
              }).finally(()=>{
                setloading(false)
              })
             
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
            />
          </Form.Item>
          <Form.Item>
            <Button
            loading={loading}
              onClick={() => {
                setIsOpenModal(false);
              }}
              type="primary"
              htmlType="submit"
            >
             {loading? "Jonatilmoqda": "+ qoshish"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default UserModal;
