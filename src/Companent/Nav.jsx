import {
  FileProtectOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import React from "react";
import useMyStor from "../my-stor";

function Nav({ saitBar, saitBars }) {
  const state = useMyStor();

  return (
    <div className="">
      <nav className=" bg-black p-3  flex justify-between">
        <p className=" text-4xl text-white">Logo</p>

        <Dropdown
          menu={{
            items: [
              {
                key: 1,
                label: "Sozlamalar",
                icon: <SettingOutlined />,
              },
              {
                key: 2,
                label: "Profil",
                icon: <FileProtectOutlined />,
              },
              {
                key: 3,
                label: "chiqish",
                icon: <PoweroffOutlined />,
                danger: true,
                onClick: ()=>{
                  localStorage.removeItem('auth')
                  useMyStor.setState({
                    token: "",
                    user: null
                  })
                }
              },
            ],
          }}
        >
          <div className="text-white flex items-center cursor-pointer">
            <div>
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            </div>
            <div>
              <div>
                {state.user.firstName} {state.user.lastName}
              </div>
              <div className=" text-blue-600"> @{state.user.username}</div>
            </div>
          </div>
        </Dropdown>
      </nav>
    </div>
  );
}

export default Nav;
