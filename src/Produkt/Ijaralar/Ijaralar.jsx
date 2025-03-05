import { CopyOutlined } from "@ant-design/icons";
import { message, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStor from "../../my-stor";
import UserPeg from "../Kitobxonlar/UserPeg";
import api from "../../api/api";
import IjaralarEdit from "./IjaralarEdit";
import ZaxiraKitobKatagi from "../../Companent/ZaxiraKitobKatagi";
import IjaralarEdid from "./OzgartrishIjarani";

function Ijaralar() {
  const [ijara, setIjara] = useState();
  const [loading, setLoading] = useState(false);
  const state = useMyStor();
  const [book, setBook] = useState();
  const [rens, setrens] = useState();

  const ijarsrefresh = () => {
    setLoading(true);
    api
      .get(`/api/rents`, {
        params: {
          size: 20,
          page: 1,
        },
      })

      .then((res) => {
        setIjara(res.data.items);
        const bokS_id = res.data.items.map((item) => {
          return item.stock.bookId;
        });

        api.get("/api/books", { params: { id: bokS_id } }).then((res) => {
          console.log(res.data.items);
          setBook(res.data.items);
        });
      })

      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    ijarsrefresh();
  }, []);

  return (
    <div className=" w-full ">
      <div className=" flex justify-between">
        <p className=" text-2xl font-bold  rounded p-2 pl-5">Ijaralar</p>

        <IjaralarEdit refresh={ijarsrefresh} />
      </div>
      <IjaralarEdid
        refresh={ijarsrefresh}
        rens={rens}
        setrens={setrens}
        setBook={setBook}
        book={book}
      />
      <Table
        className=" w-full"
        loading={loading}
        dataSource={ijara}
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
            render: (id, items) => {
              return (
                <div
                  onClick={() => {
                    setrens(items);
                  }}
                >
                  {id}
                </div>
              );
            },
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
            render: (value) => {
              return <Switch checked={value ? true : false} />;
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
            key: "stock",
            title: "Zaxira",
            dataIndex: "stock",
            render: (stock) => {
              return <ZaxiraKitobKatagi stock={stock} book={book} />;
            },
          },
        ]}
      />
    </div>
  );
}

export default Ijaralar;
