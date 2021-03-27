import React from "react";
import { Menu } from "antd";

const ITEMS = ["找寵物", "找收容所", "會員專區", "登入"];

const menuItems = ITEMS.map(function (item, i) {
  return <Menu.Item key={i}>{item}</Menu.Item>;
});

const Navbar = () => (
  <Menu mode="horizontal" defaultSelectedKeys={["0"]}>
    {menuItems}
  </Menu>
);

export default Navbar;
