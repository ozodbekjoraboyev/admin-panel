import { Button, Drawer, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "../my-stor";
import User_modal from "./User_modal";

function UserPeg() {
  const [kutbhona, setkutbhona] = useState();

  const state = useMyStor();

  const nomlash = () => {
    axios
      .get(`https://library.softly.uz/api/users`, {
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
        setkutbhona(res.data.items);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  useEffect(() => {
    nomlash()
  }, []);
  return (
    <div className=" w-full ">
      <div className=" flex  justify-between items-center">
        <p className=" text-2xl font-bold  rounded p-2 pl-5">kutbhonalar</p>
        <User_modal ozgarish={nomlash} />
      </div>
      <Table
        className=" w-full"
        dataSource={kutbhona}
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Ism",
            dataIndex: "firstName",
            key: "firstName",
          },

          {
            title: "Familya",
            dataIndex: "lastName",
            key: "lastName",
          },
          {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
          },
        ]}
      />
    </div>
  );
}

export default UserPeg;
