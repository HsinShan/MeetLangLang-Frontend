import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import usePathname from '../../hooks/usePathname';

const LINKS = ['/search', '/map', '/share', '/discuss', '/member'];

const Navbar = () => {
    const { t } = useTranslation();
    const menuItems = t('header.navbar', { returnObjects: true }).map((item, i) => (
        <Menu.Item key={i}>
            <Link to={LINKS[i]} className='link'>{item}</Link>
        </Menu.Item>
    ));
    const pathname = usePathname();
    let activeIndex = _.findIndex(LINKS, (link) => pathname === link);
    let selectedKeys = [activeIndex.toString()];
    if (!pathname) activeIndex = 0;
    if (pathname && activeIndex === -1) selectedKeys = [];

    return (
        <Menu mode='horizontal' selectedKeys={selectedKeys}>
            {menuItems}
        </Menu>
    );
};

export default Navbar;
