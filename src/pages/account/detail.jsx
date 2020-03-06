import React from 'react';
import { Table, Descriptions } from 'antd';
import styles from './style.less';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 1; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class TableList extends React.Component {
  state = {
    loading: false,
    toggle: false,
  };

  // 展开/收起
  handleToggle = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
  };

  render() {
    const { loading, toggle} = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    return (
      <>
        <Descriptions 
          className={styles.center}
          column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="报案号">123</Descriptions.Item>
          <Descriptions.Item label="报案号">123</Descriptions.Item>
          <Descriptions.Item label="报案号">123</Descriptions.Item>
          <Descriptions.Item label="报案号">123</Descriptions.Item>
          <Descriptions.Item label="报案号">123</Descriptions.Item>
          <Descriptions.Item label="报案号">123</Descriptions.Item>
          <Descriptions.Item label="报案号">321</Descriptions.Item>
        </Descriptions>
        <Table 
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          bordered={true}
          size="small"
        />
      </>
    );
  }
}

export default TableList;