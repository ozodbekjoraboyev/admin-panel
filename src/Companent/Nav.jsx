import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

function Nav({ saitBar, saitBars }) {
  return (
    <div className=" container m-auto">
      <nav className=" relative -z-50 bg-blue-900 p-3  flex justify-between">
        <p className=" text-4xl text-white">Logo</p>
        <p className=" text-4xl text-white">Avatar</p>
      </nav>
      <Button type="primary" onClick={saitBars}  style={{ marginBottom: 16 }}>
        {saitBar ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </Button>
    </div>
  );
}

export default Nav;
