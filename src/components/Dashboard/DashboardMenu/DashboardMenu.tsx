import React, { useState } from "react";
import {
  FolderOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Button,  Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Content, Sider } = Layout;

const menusLink = [
  {
    text: "Category",
    icon: FolderOutlined,
    children: [
      {
        path: "/dashboard/create-category",
        text: "Create Category",
      },
      {
        path: "/dashboard/manage-category",
        text: "Manage Category",
      },
    ],
  },
  {
    text: "Products",
    icon: ProductOutlined,
    children: [
      {
        path: "/dashboard/create-products",
        text: "Create Products",
      },
      {
        path: "/dashboard/manage-products",
        text: "Manage Products",
      },
    ],
  },
];

const menu = menusLink.map((menu, index) => {
  return {
    key: `sub${index}`,
    icon: React.createElement(menu.icon),
    label: `${menu.text}`,

    children: menu.children.map((childMenu, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: <Link to={childMenu.path}>{childMenu.text}</Link>,
      };
    }),
  };
});

const DashboardMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [, setIsMobile] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const {
    token: { colorText, colorBgContainer, borderRadiusLG },
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
            <Sider
              style={{ background: colorBgContainer }}
              width={200}
              
              collapsed={collapsed}
              breakpoint="md" 
              onBreakpoint={(broken) => {
                setIsMobile(broken); 
                setCollapsed(broken); 
              }}
              onCollapse={(collapse) => setCollapsed(collapse)}
            >
              <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{ marginBottom: 16 }}
                
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub2"]}
                inlineCollapsed={collapsed}
                style={{
                  height: "100%",
                  color: colorText,
                }}
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
