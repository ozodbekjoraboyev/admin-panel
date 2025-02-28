import { CopyOutlined } from "@ant-design/icons";
import { message, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "../../my-stor";
import UserPeg from "../Kitobxonlar/UserPeg";

function Ijaralar() {
  const [ijara, setIjara] = useState();
  const state = useMyStor();
  useEffect(() => {
    axios
      .get(`https://library.softly.uz/api/rents`, {
        params: {
          size: 20,
          page: 1,
        },
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setIjara(res.data.items);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return (
    <div className=" w-full ">
                <p className=" text-2xl font-bold bg-blue-300 rounded p-2 pl-5">Ijaralar</p>
      <Table
        className=" w-full"
        dataSource={ijara}
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Id",
            dataIndex: "customId",
            key: "customId",
          },
          {
            title: "Berildi",
            dataIndex: "leasedAt",
            key: "leasedAt",
            render: (valus) => {
              return new Date(valus).toLocaleString("ru");
            },
          },
          {
            title: "Qaytarish sanasi",
            dataIndex: "returningDate",
            key: "returningDate",
            render: (valus) => {
              return new Date(valus).toLocaleString("ru", {
                day: "numeric",
                month: "2-digit",
                year: "numeric",
              });
            },
          },
          {
            title: "Qaytadigan",
            dataIndex: "returnedAt",
            key: "returnedAt",
            render: (Checkbox) => {
              if (Checkbox) {
                return <Switch defaultChecked onChange={Checkbox} />;
              } else {
                return <Switch onChange={Checkbox} />;
              }
            },
          },

          {
            title: "Kutbxona",
            dataIndex: "user",
            key: "id",
            render: (user) => {
              return (
                <p>
                  {user.id}{" "}
                  <span className=" text-blue-700">
                    {user.firstName} {user.lastName} <CopyOutlined />
                  </span>
                </p>
              );
            },
          },
          {
            title: "Zaxira kutbhona",
            dataIndex: "stockId",
            key: "id",
          },
        ]}
      />
    </div>
  );
}

export default Ijaralar;
