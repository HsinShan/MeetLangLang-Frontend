import { Table, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/style/discuss/discussTable.scss';

const DiscussTable = ({ data }) => {
    const { t } = useTranslation();
    const [dataSource, setDataSource] = useState(data);
    const [titleValue, setTitleValue] = useState('');
    const [authorValue, setAuthorValue] = useState('');
    const rowPerPage = 15;

    const FilterByTitleInput = (
        <div className='search-column-header'>
            <div className='search-column-title'>{t('discuss.title')}</div>
            <Input
                className='search-input'
                placeholder={t('discuss.title-search')}
                value={titleValue}
                onChange={(e) => {
                    setAuthorValue(null);
                    const currValue = e.target.value;
                    setTitleValue(currValue);
                    const filteredData = data.filter((entry) => entry.title.includes(currValue));
                    setDataSource(filteredData);
                }}
            />
        </div>
    );

    const FilterByAuthorInput = (
        <div className='search-column-header'>
            <div className='search-column-title'>{t('discuss.author')}</div>
            <Input
                className='search-input'
                placeholder={t('discuss.author-search')}
                value={authorValue}
                onChange={(e) => {
                    setTitleValue(null);
                    const currValue = e.target.value;
                    setAuthorValue(currValue);
                    const filteredData = data.filter((entry) => entry.author.includes(currValue));
                    setDataSource(filteredData);
                }}
            />
        </div>
    );

    const columns = [
        {
            title: FilterByTitleInput,
            dataIndex: 'title',
            key: 'title',
            className: 'column-title',
        },
        {
            title: FilterByAuthorInput,
            dataIndex: 'author',
            key: 'author',
            className: 'column-author',
        },
        {
            title: t('discuss.date'),
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date.localeCompare(b.date),
            sortDirections: ['descend', 'ascend'],
            className: 'column-date',
        },
    ];

    useEffect(() => {
        setDataSource(data);
    }, [data]);

    const changePage = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    const paginationProps = {
        onChange: changePage,
        pageSize: rowPerPage,
    };

    function click(index) {
        window.location.href = `/discuss/detail?uuid=${index}`;
    }

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={paginationProps}
            pageSize={rowPerPage}
            onRow={(record) => ({ onClick: () => { click(record.key); } }) }
        />
    );
};

export default DiscussTable;
