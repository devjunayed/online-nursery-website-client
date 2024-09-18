import React from "react";
import {
  LaptopOutlined,

} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Content, Sider } = Layout;



const menusLink = [
    {
        text: "Category",
        icon: LaptopOutlined,
        children: [
            {
                path: "/dashboard/manage-category",
                text: "Manage Category",
            }
        ]
    },
    {
        text: "Products",
        icon: LaptopOutlined,
        children: [
            {
                path: "/dashboard/manage-products",
                text: "Manage Products",
            }
        ]
    },
]

const menu = menusLink.map((menu, index) => {
     return {
        key: `sub${index}`,
        icon: React.createElement(menu.icon),
        label: `${menu.text}`,
    
        children: menu.children.map((childMenu, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: (
                <Link to={childMenu.path}>
                    {childMenu.text}
                </Link>
            ),
          };
        }),
      };
})

const DashboardMenu: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={menu}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default DashboardMenu;
