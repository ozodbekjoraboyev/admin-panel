import { Button, Drawer, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "../../my-stor";
import {
  CheckSquareTwoTone,
  CloseCircleOutlined,
  CloseCircleTwoTone,
  SafetyCertificateOutlined,
  SafetyCertificateTwoTone,
} from "@ant-design/icons";
import Stoks from "./Stoks";

function Kitoblarim() {
  const [kitoblarim, setkitoblarim] = useState();
  const [currenPage, setCurrenPage] = useState(1);
  const pegsSiaze = 10;
  const state = useMyStor();
 
  const nomlash = () => {
    axios
      .get(`https://library.softly.uz/api/stocks`, {
        params: {
          size: pegsSiaze,
          page: currenPage,
        },
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setkitoblarim(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    nomlash();
  }, [currenPage]);

  if (!kitoblarim) {
    return (
      <>
        <Spin />
      </>
    );
  }
  return (
    <div className=" w-full ">
      <div className=" flex  justify-between items-center">
        <p className=" text-2xl font-bold  rounded p-2 pl-5">kitoblarim</p>
        <Stoks ozgarish={nomlash} />
      </div>

      <Table
        className=" w-full"
        dataSource={kitoblarim.items}
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
            render: (id) => {
              return <div onClick={() => {}}>{id}</div>;
            },
          },
          {
            title: "Kitoblar",
            dataIndex: "book",
            key: "book",
            render: (book) => {
              return (
                <div>
                  {book?.id} {book?.name}
                </div>
              );
            },
          },
          {
            title: "Bantlik",
            dataIndex: "busy",
            key: "busy",
            render: (busy) => {
              return (
                <div>
                  {!busy ? (
                    <SafetyCertificateTwoTone twoToneColor="#52c41a" />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="#eb2f96" />
                  )}
                </div>
              );
            },
          },
        ]}
        pagination={{
          pageSize: pegsSiaze,
          current: currenPage,
          total: kitoblarim.totalCount,
        }}
        onChange={(pagination) => {
          setCurrenPage(pagination.current);
        }}
      />
    </div>
  );
}

export default Kitoblarim;
