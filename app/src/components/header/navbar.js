import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import _ from 'lodash';
import usePathname from '../../hooks/usePathname';

const ITEMS = ['領養浪浪', '收容所搜尋', '飼養知識', '留言板', '我的收藏'];
const LINKS = ['/search', '/map', '/share', '/discuss', '/member'];

const menuItems = ITEMS.map((item, i) => (
    <Menu.Item key={i}>
        <Link to={LINKS[i]}>{item}</Link>
    </Menu.Item>
));

const Navbar = () => {
    const pathname = usePathname();
    let activeIndex = _.findIndex(LINKS, (link) => pathname === link);
    if (activeIndex === -1) activeIndex = 0;
    const selectedKeys = (pathname === '/login') ? [] : [activeIndex.toString()];

    return (
        <Menu mode='horizontal' selectedKeys={selectedKeys}>
            {menuItems}
        </Menu>
    );
};

export default Navbar;
