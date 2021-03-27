import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const ITEMS = ["找寵物", "我的收藏", "登入"];
const LINKS = ["search", "member", "login"];

const menuItems = ITEMS.map(function (item, i) {
  return (
    <Menu.Item key={i}>
      <Link to={`/${LINKS[i]}`}>{item}</Link>
    </Menu.Item>
  );
});

const Navbar = () => (
  <Menu mode="horizontal" defaultSelectedKeys={["0"]}>
    {menuItems}
  </Menu>
);

export default Navbar;
