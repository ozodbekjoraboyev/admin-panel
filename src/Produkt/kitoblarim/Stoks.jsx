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
import api from "../../api/api";

function KitobQoshish({ ozgarish }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [books, setBooks] = useState();

  const state = useMyStor();
  useEffect(() => {
    api
      .get("/api/books", {
   
      })
      .then((res) => {
        ozgarish()
        setBooks(res.data.items);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
      });
  }, []);
  if (!books) {
    return (
      <div className="m-auto flex justify-center  items-center absolute top-0 bottom-0 left-0 right-0">
      <div className="w-16 h-16 border-4   border-t-transparent rounded-full animate-spin"></div>
    </div>
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
            api
              .post(`/api/stocks`, values, {
                headers: {
                  authorization: `Bearer ${state.token}`,
                },
              })
              .then((res) => {
                console.log(res.data);
                message.success("qo'shildi");
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
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              options={books.map((item) => {
                return { label: item.name, value: item.id };
              })}
            />
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

export default KitobQoshish;
