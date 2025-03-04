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
import KitobQoshish from "./Stoks";
import api from "../../api/api";

function Kitoblarim() {
  const [kitoblarim, setkitoblarim] = useState();
  const [currenPage, setCurrenPage] = useState(1);
  const pegsSiaze = 10;
  const state = useMyStor();

  const nomlash = () => {
    api
      .get(`/api/stocks`, {
        params: {
          size: pegsSiaze,
          page: currenPage,
        },
      
      })
      .then((res) => {
       
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
      <div className="m-auto flex justify-center  items-center absolute top-0 bottom-0 left-0 right-0">
      <div className="w-16 h-16 border-4   border-t-transparent rounded-full animate-spin"></div>
    </div>
    );
  }
  return (
    <div className=" w-full ">
      <div className=" flex  justify-between items-center">
        <p className=" text-2xl font-bold  rounded p-2 pl-5">kitoblarim</p>
        <KitobQoshish ozgarish={nomlash} />
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
