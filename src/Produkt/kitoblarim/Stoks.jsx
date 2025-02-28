import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Spin,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "../../my-stor";

function Stoks({ ozgarish }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [books, setBooks] = useState();

  
  const state = useMyStor();
  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/books", {
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setBooks(res.data.items);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
      });
  }, []);
  if (!books) {
    return (
      <>
        <Spin />
      </>
    );
  }
  return (
    <div>
      <Button type="primary" onClick={() => setIsOpenModal(true)}>
        + Qo'shish
      </Button>

      <Drawer
        title="kitob qo'shish"
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            setloading(true);
            axios
              .post(`https://library.softly.uz/api/stocks`, values, {
                headers: {
                  authorization: `Bearer ${state.token}`,
                },
              })
              .then((res) => {
                console.log(res.data);
                message.success("Foydalanuvchi muvaffaqiyatli qo‘shildi!");
                setIsOpenModal(false);
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
            label="bookId"
            name="bookId"
            rules={[
              { required: true, message: "Iltimos, ismingizni kiriting!" },
            ]}
          >
            <div>
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="label"
                options={books.map((item) => {
                  console.log(item);

                  return { label: item.name, value: item?.id };
                })}
              />
            </div>
          </Form.Item>
          <Form.Item
            label="kitob idsi"
            name="bookId"
            rules={[{ required: true, message: "Iltimos, familya kiriting!" }]}
          >
            <InputNumber />
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
              {loading ? "Jonatilmoqda" : "+ qoshish"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default Stoks;
