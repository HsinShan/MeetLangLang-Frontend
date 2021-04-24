import { Table, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import '../../assets/style/discuss/discussTable.scss';

const DiscussTable = ({ data }) => {
    const [dataSource, setDataSource] = useState(data);
    const [titleValue, setTitleValue] = useState('');
    const [authorValue, setAuthorValue] = useState('');
    const rowPerPage = 15;

    const FilterByTitleInput = (
        <div className='search-column-header'>
            <div className='search-column-title'>主題</div>
            <Input
                className='search-input'
                placeholder="搜尋主題"
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
            <div className='search-column-title'>作者</div>
            <Input
                className='search-input'
                placeholder="搜尋作者"
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
            title: '發布日期',
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

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={paginationProps}
            pageSize={rowPerPage}
        />
    );
};

export default DiscussTable;