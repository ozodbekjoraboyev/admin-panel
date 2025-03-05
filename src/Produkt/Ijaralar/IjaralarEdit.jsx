import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
} from "antd";
import React, { lazy, useEffect, useState } from "react";
import useMyStor from "../../my-stor";
import api from "../../api/api";

function IjaralarEdit({ ozgarish, refresh, rens, setrens }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState({
    users: [],
    stocks: [],
  });

  const state = useMyStor();

  useEffect(() => {
    api
      .get(`/api/stocks`, {
        params: {
          "filters[busy]": false,
        },
      })
      .then((res) => {
        setdata((data) => ({
          ...data,
          stocks: res.data.items,
        }));

        console.log(res.data);
        // console.log(data.stocks);
      });
    api.get(`/api/users`).then((res) => {
      setdata((data) => ({
        ...data,
        users: res.data.items,
      }));
    });
  }, []);

  return (
    <div>
      <Button type="primary" onClick={() => setIsOpenModal(true)}>
        + Qo'shish
      </Button>

      <Drawer
        title="Kitobxon qo'shish"
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        destroyOnClose
      >
        <Form
          layout="vertical"
          initialValues={rens}
          onFinish={(values) => {
            console.log(values);
            setloading(true);
            api
              .post(`/api/rents`, values)
              .then((res) => {
                setloading(false);
                setIsOpenModal(false);
                console.log(res.data);
                message.success("Success");
                refresh?.();
              })
              .catch((e) => {
                console.error(e);
                setloading(false);
                message.error(e.response.data.message);
              })
              .finally(() => {
                setloading(false);
              });
          }}
        >
          <Form.Item
            label="kutubxona"
            name="userId"
            rules={[
              { required: true, message: "Iltimos, ismingizni kiriting!" },
            ]}
          >
            <Select
              options={data.users.map((user) => {
                return {
                  label: `${user.firstName}  ${user.lastName}`,
                  value: user.id,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            label="kitoblar"
            name="stockId"
            rules={[{ required: true, message: "Iltimos, familya kiriting!" }]}
          >
            <Select
              options={data.stocks.map((stock) => {
                return {
                  label: stock.book?.name,
                  value: stock.id,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            label="topshirilgan Sana "
            name="leasedAt"
            rules={[
              {
                required: true,
                message: "Iltimos, telefon raqamni  kiriting!",
              },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Qaytarilgan  Sana "
            name="returningDate"
            rules={[
              {
                required: true,
                message: "Iltimos, telefon raqamni  kiriting!",
              },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="topshirilgan Sana "
            name="leasedAt"
            rules={[
              {
                required: true,
                message: "Iltimos, telefon raqamni  kiriting!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              {loading ? "Jonatilmoqda" : "+ qoshish"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default IjaralarEdit;
