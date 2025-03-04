// import {
//   FolderOpenOutlined,
//   HomeOutlined,
//   ProductOutlined,
// } from "@ant-design/icons";
// import { Menu } from "antd";
// import Link from "antd/es/typography/Link";
// import React from "react";
// import { useLocation } from "react-router-dom";

// function Saitbar({ Saitbar }) {
//   const location = useLocation();
//   return (
//     <div>
//       <header className=" container m-auto">
//         <div className=" flex  flex-col gap-5  bg-black rounded-t-0 rounded-b-xl text-white w-52 h-[100vh] p-4 text-2xl">
//           <Menu
//             style={{
//               height: "100vh",
//               maxWidth: 400,
//             }}
//             defaultSelectedKeys={[location.pathname]}
//             defaultOpenKeys={["sub1"]}
//             mode="inline"
//             theme="dark"
//             inlineCollapsed={Saitbar}
//           >
//             items=
//             {[
//               {
//                 key: "/",
//                 label: <Link to={"/"}> Home</Link>,
//                 icon: <HomeOutlined />,
//               },
//               {
//                 key: "/mahsulotlar",
//                 label: <Link to={"/mahsulotlar"}> Mahsulotlar</Link>,
//                 icon: <ProductOutlined />,
//               },
//               {
//                 key: "/kategores",
//                 label: <Link to={"/kategores"}> Kategorya</Link>,
//                 icon: <FolderOpenOutlined />,
//               },
//             ]}
//           </Menu>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Saitbar;
import {
  BoldOutlined,
  BookOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  ProductOutlined,
  ReconciliationFilled,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";

function Saitbar({ Saitbar }) {
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      label: <Link to={"/"}> Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "/mahsulotlar",
      label: <Link to={"/mahsulotlar"}> Mahsulotlar</Link>,
      icon: <ProductOutlined />,
    },
    {
      key: "/kategores",
      label: <Link to={"/kategores"}> Kategorya</Link>,
      icon: <FolderOpenOutlined />,
    },
    {
      key: "/ijaralar",
      label: <Link to={"/ijaralar"}> Ijaralar</Link>,
      icon: <ReconciliationFilled />,
    },
    {
      key: "/Kitoblarim",
      label: <Link to={"/Kitoblarim"}>Kitoblarim</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "/userpeg",
      label: <Link to={"/userpeg"}>Kitobxonlar</Link>,
      icon: <BoldOutlined />,
    },

  ];

  return (
    <div>
      <header className="container m-auto">
        <div className="flex flex-col gap-5 bg-black rounded-t-0 rounded-b-xl text-white w-52 h-[100vh] p-4 text-2xl">
          <Menu
            style={{
              height: "100vh",
              maxWidth: 400,
            }}
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={Saitbar}
            items={menuItems}
          />
        </div>
      </header>
    </div>
  );
}

export default Saitbar;
