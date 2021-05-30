import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs, message } from 'antd';
import { useTranslation } from 'react-i18next';
import MyFavorites from '../../components/member/myFavorites';
import MyPets from '../../components/member/myPets';
import MatchReceived from '../../components/member/matchReceived';
import '../../assets/style/member/index.scss';

const { TabPane } = Tabs;

const goToLoginPage = (history) => {
    history.push('/login');
};

function Member() {
    const { t } = useTranslation();
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.warning(t('member.not-log-in'));
            goToLoginPage(history);
        }
    }, [history, t]);

    return (
        <div className="member">
            <Tabs defaultActiveKey="1" tabPosition="top" centered>
                <TabPane tab={t('member.pets')} key="1">
                    <MyPets />
                </TabPane>
                <TabPane tab={t('member.favorites')} key="2">
                    <MyFavorites />
                </TabPane>
                <TabPane tab={t('member.match')} key="3">
                    <MatchReceived />
                </TabPane>
            </Tabs>
        </div>
    );
}
export default Member;
