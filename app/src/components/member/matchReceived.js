import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Spin, Collapse } from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import '../../assets/style/member/matchReceived.scss';
import PetList from './petList';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function MatchReceived() {
    const { t } = useTranslation();
    const [matchData, setMatchData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { Panel } = Collapse;

    const getMatch = async (token) => {
        const { hostname } = window.location;
        const { data } = await axios({
            method: 'get',
            url: `${apiProtocol}://${hostname}:${apiPort}/match/list`,
            headers: { token },
        });
        setMatchData(data);
        setLoading(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        getMatch(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <>
            { isLoading && <Spin tip={t('member.loading')} />}
            { !isLoading && matchData.length === 0 && <div className='no-match'>{t('member.no-match')}</div>}
            { !isLoading && matchData.length !== 0 &&
                <div className='match-list'>
                    <Collapse
                        accordion
                        expandIcon={({ isActive }) => (isActive ? <UserAddOutlined fontSize={'20px'} /> : <UserOutlined fontSize={'20px'} />)}
                    >
                        {
                            matchData.map((x) => (
                                <Panel
                                    header={
                                        <div className='sender-info'>
                                            <div className='sender-name'>{t('member.sender-name')}{x.name}</div>
                                            <div className='sender-email'>{t('member.sender-email')}{x.email}</div>
                                        </div>
                                    }
                                    key={x.userId}
                                >
                                    <PetList pets={x.petData} />
                                </Panel>
                            ))
                        }
                    </Collapse>
                </div>
            }
        </>
    );
}
export default MatchReceived;
