import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs, message } from 'antd';
import { useTranslation } from 'react-i18next';
import MyFavorites from '../../components/member/myFavorites';
import UseDeviceDetect from '../../hooks/useDeviceDetect';
import '../../assets/style/member/index.scss';

const { TabPane } = Tabs;

const goToLoginPage = (history) => {
    history.push('/login');
};

function Member() {
    const { t } = useTranslation();
    const history = useHistory();
    const device = UseDeviceDetect();
    const [mode, setMode] = useState('left');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.warning(t('member.not-log-in'));
            goToLoginPage(history);
        }

        if (device === 'mobile') setMode('top');
    }, [history, t, setMode, device]);

    return (
        <div className="member">
            <Tabs defaultActiveKey="1" tabPosition={mode} centered>
                <TabPane tab={t('member.pets')} key="1">
                    My Pets
                </TabPane>
                <TabPane tab={t('member.favorites')} key="2">
                    <MyFavorites />
                </TabPane>
            </Tabs>
        </div>
    );
}
export default Member;
