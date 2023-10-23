import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";




const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  to?: string,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    to: to || "/",
    children,
    label: (
      <Link style={{ color: "white" }} to={to || "/"}>
        {label}
      </Link>
    ),
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Back to website", "0", <ArrowLeftOutlined />, "/"),
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Products", "sub1", <FileOutlined />, "/admin/products", [
    getItem("List", "2", undefined, "/admin/products"),
    getItem("Add new", "3", undefined, "/admin/products/add"),
  ]),
  getItem("Categories", "sub2", <FileOutlined />, "/admin/categories", [
    getItem("List", "4", undefined, "/admin/categories"),
    getItem("Add new", "5", undefined, "/admin/categories/add"),
  ]),
  getItem("User", "6", <UserOutlined />),
];

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
