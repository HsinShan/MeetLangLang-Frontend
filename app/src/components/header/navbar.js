import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import _ from 'lodash';
import usePathname from '../../hooks/usePathname';

const ITEMS = ['找寵物', '我的收藏', '登入'];
const LINKS = ['/search', '/member', '/login'];

const menuItems = ITEMS.map((item, i) => (
    <Menu.Item key={i}>
        <Link to={LINKS[i]}>{item}</Link>
    </Menu.Item>
));

const Navbar = () => {
    const pathname = usePathname();
    let activeIndex = _.findIndex(LINKS, (link) => pathname === link);

    if (activeIndex === -1) activeIndex = 0;

    return (
        <Menu mode='horizontal' defaultSelectedKeys={[activeIndex.toString()]}>
            {menuItems}
        </Menu>
    );
};

export default Navbar;
