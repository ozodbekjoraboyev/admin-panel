import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
function Categori() {
  const [catigoris, setCatigoris] = useState();
  useEffect(() => {
    axios
      .get(`https://67b81c5f2bddacfb2710fac7.mockapi.io/categories`)
      .then((res) => {
        setCatigoris(res.data);
        console.log(res.data);
      });
  }, []);
  if (!catigoris) {
    return (
      <div className="m-auto flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
        <div className="w-16 h-16 border-4  border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className=" w-full">
      <div className=" w-ful p-2 bg-blue-200 ">
        <p className=" bg-white p-2 rounded">ProduktPege</p>
      </div>
      <Table
        dataSource={catigoris}
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "image",
            dataIndex: "image",
            key: "image",
            render: (image) => {
              return (
                <>
                  <img className=" w-20 rounded" src={image} alt="" />
                </>
              );
            },
          },
        ]}
      />
    </div>
  );
}

export default Categori;
