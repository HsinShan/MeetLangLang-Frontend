import {
    Comment,
    List,
    Avatar,
    Divider,
    Tooltip,
} from 'antd';
import { EditOutlined, MessageOutlined } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const ResponseList = ({ data }) => {
    const { t } = useTranslation();
    const sortedData = data.sort((a, b) => a.respId - b.respId);
    return (
        <>
            {(data.length !== 0) &&
                <List
                    className="response-list"
                    icon={<MessageOutlined />}
                    header={`${t('discuss.response-total')} ${data.length} ${t('discuss.comments')}`}
                    itemLayout="horizontal"
                    dataSource={sortedData}
                    renderItem={(item) => (
                        <li>
                            <Comment
                                datetime={
                                    <Tooltip title={moment(item.time).format('YYYY-MM-DD HH:mm')}>
                                        <span>{moment(moment(item.time).local()).fromNow()}</span>
                                    </Tooltip>}
                                author={item.author}
                                content={item.content}
                                avatar={<Avatar size="large">{item.author.charAt(0)}</Avatar>}
                            />
                            <Divider />
                        </li>
                    )}
                />}
            {(data.length === 0) &&
                <div className='no-comment'>
                    <div>
                        <EditOutlined />
                        <p>{t('discuss.no-response-msg')}</p>
                    </div>
                </div>
            }
        </>
    );
};

export default ResponseList;
