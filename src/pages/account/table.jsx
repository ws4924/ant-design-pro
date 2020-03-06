import React from 'react';
import { Table, Button, Divider, Tag, Row, Col, Form, Input, Select, DatePicker, Badge, Card } from 'antd';
import styles from './style.less';

const { Option } = Select;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    render: text => {
      return text === '1' ? '男':'女'
    }
  },
  {
    title: `Flag`,
    dataIndex: `flag`,
    render: (text) => {
      const flags = {
        '1': <Badge status="success" text="成功" />,
        '2': <Badge status="error" text="报错" />,
        '3': <Badge status="default" text="正常" />,
        '4': <Badge status="processing" text="进行中" />,
        '5': <Badge status="warning" text="警告" />,
      }
      return flags[text];
    }
  },
  {
    title: `年龄`,
    dataIndex: 'age'
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
    flag: `${i}`,
    sex: `1`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

@Form.create()
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

  // 搜索
  handleSearch = () => {
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) return false;
      values[values.search_type] = values.search_val;
      if (values.city) {
        values.province_code = values.city[0] || '';
        values.city_code = values.city[1] || '';
        values.area_code = values.city[2] || '';
      }
      if (values.feedback_time) {
        values.start_feedback_time = getTimestamp(values.feedback_time[0]);
        values.end_feedback_time = getTimestamp(values.feedback_time[1]);
      }
      if (values.handle_time) {
        values.start_handle_time = getTimestamp(values.handle_time[0]);
        values.end_handle_time = getTimestamp(values.handle_time[1]);
      }
      this.props.onSearch(values);
    });
  };
  
  // 重置
  handleReset = () => {
    this.props.form.resetFields();
    this.handleSearch();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { searchDefaultVal, loading, toggle, searchField } = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    const colLayout = {
      xxl: 6,
      xl: 8,
      lg: 12,
      md: 12,
      sm: 12,
      xs: 24,
    };

    return (
      <Card>
        <Form className={styles.center}>
          <Row
            className="me_form"
            gutter={10}
            style={{ height: toggle ? 'auto' : 50, overflow: toggle ? 'inherit' : 'hidden' }}
          >
            <Col {...colLayout}>
              <Form.Item label="商品编号">
                {getFieldDecorator('goodsCode', {
                  initialValue: '',
                })(
                  <Input placeholder="商品编号" />
                )}
              </Form.Item>
            </Col>
            <Col {...colLayout}>
              <Form.Item label="商品名称">
                {getFieldDecorator('partsName', {
                  initialValue: '',
                })(
                  <Input placeholder="商品名称" />
                )}
              </Form.Item>
            </Col>
            <Col {...colLayout}>
              <Form.Item label="商品分类">
                {getFieldDecorator('goodsTypeCode', {
                  initialValue: '',
                })(
                  <Select>
                    <Option value="">产品分类</Option>
                    <Option value="A09001">lrdtest1003</Option>
                    <Option value="A09002">lrdtest1004</Option>
                    <Option value="A17001">底盘1</Option>
                    <Option value="A03001">水箱</Option>
                    <Option value="A03002">14</Option>
                    <Option value="A06001">叶子板</Option>
                    <Option value="1">lrdtest1003</Option>
                    <Option value="2">lrdtest1004</Option>
                    <Option value="3">底盘1</Option>
                    <Option value="4">水箱</Option>
                    <Option value="5">14</Option>
                    <Option value="6">叶子板</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col {...colLayout}>
              <Form.Item label="OE号">
                {getFieldDecorator('partOe', {
                  initialValue: '',
                })(
                  <Input placeholder="OE号" />
                )}
              </Form.Item>
            </Col>
            <Col {...colLayout}>
              <Form.Item label="商品品牌">
                {getFieldDecorator('partsBrandName', {
                  initialValue: '',
                })(
                  <Input placeholder="商品品牌" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.handleSearch}>
              查询
            </Button>{' '}
            <Button onClick={this.handleReset}>重置</Button>
            <a style={{ marginLeft: 10 }} onClick={this.handleToggle.bind(this)}>
              {!toggle ? '展开' : '收起'}
            </a>
          </Form.Item>
          <Table 
            rowSelection={rowSelection} 
            columns={columns} 
            dataSource={data} 
            bordered={true} 
            size="small" />
        </Form>
      </Card>
    );
  }
}

export default TableList;