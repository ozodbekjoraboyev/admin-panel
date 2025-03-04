import { Button, Drawer, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "../../my-stor";
import User_modal from "./User_modal";
import EditUser from "../EditUser/EditUser";
import api from "../../api/api";

function UserPeg() {
  const [kutbhona, setkutbhona] = useState();
  const [currenPage, setCurrenPage] = useState(1);
  const pegsSiaze = 10;
  const state = useMyStor();
  const [user, setuser] = useState();

  const nomlash = () => {
    api
      .get(`/api/users`, {
        params: {
          size: pegsSiaze,
          page: currenPage,
        },
  
      })
      .then((res) => {
        console.log(res.data);
        setkutbhona(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    nomlash();
  }, [currenPage]);

  if (!kutbhona) {
    return (
      <div className="m-auto flex justify-center  items-center absolute top-0 bottom-0 left-0 right-0">
      <div className="w-16 h-16 border-4   border-t-transparent rounded-full animate-spin"></div>
    </div>
    );
  }
  return (
    <div className=" w-full ">
      <div className=" flex  justify-between items-center">
        <p className=" text-2xl font-bold  rounded p-2 pl-5">kutbxonalar</p>
        <User_modal ozgarish={nomlash} setuser={setuser} user={user} />
      </div>
      <EditUser
        user={user}
        setuser={setuser}
        setkutbhona={setkutbhona}
        kutbhona={kutbhona}
      />
      <Table
        className=" w-full"
        dataSource={kutbhona.items}
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
            render: (id, items) => {
              return (
                <div
                  onClick={() => {
                    setuser(items);
                  }}
                >
                  {id}
                </div>
              );
            },
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
        pagination={{
          pageSize: pegsSiaze,
          current: currenPage,
          total: kutbhona.totalCount,
        }}
        onChange={(pagination) => {
          setCurrenPage(pagination.current);
        }}
      />
    </div>
  );
}

export default UserPeg;
