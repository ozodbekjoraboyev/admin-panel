import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "../../my-stor";
import api from "../../api/api";

function IjaralarEdid({ refresh, rens, setrens }) {
  const [loading, setloading] = useState(false);

  const state = useMyStor();

  console.log(rens);

  if (!rens) {
    return <>hytrertyuhk</>;
  }
  return (
    <div>
      <Drawer
        title="Kitobxon o'zgartrish"
        open={rens ? true : false}
        onClose={() => setrens(null)}
        destroyOnClose
      >
        <Form
          initialValues={{
            ...rens,
            leasedAt: rens.leasedAt.slice(0, 10),
            returningDate: rens.returningDate.slice(0, 10),
          }}
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            setloading(true);
            api
              .put(`/api/rents/${rens.id}`, values)
              .then((res) => {
                console.log(res.data);
                message.success("Foydalanuvchi muvaffaqiyatli qo‘shildi!");
                setrens(null);
                refresh?.();
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
          <Form.Item label="KItobxon" name={"stockId"}>
            <Select />
          </Form.Item>

          <div className=" flex">
            <Form.Item label="Topshirilgan Sana" name={"leasedAt"}>
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Qaytarililishi  sana" name={"returningDate"}>
              <Input type="date" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              {loading ? "Jonatilmoqda" : "+ O'zgartrish"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default IjaralarEdid;
