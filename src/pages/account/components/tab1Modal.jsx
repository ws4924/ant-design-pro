import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Modal, Button, Cascader, Form, Input, Select, DatePicker } from 'antd';
import citys from '@/components/CitySelection';  //city json 引入
import styles from './../style.less';

const { Option } = Select;
const residences = citys;  //省市选择组件

@Form.create()
class EditTabLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false, // 是否隐藏/显示新增弹窗
    };

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.onOk = this.onOk.bind(this);
  }
  
  onOk = () => {
    this.props.onOk(false);
  };
  onCancel = () => {
    this.props.onCancel(false);
  };

  render() {
    const {
      visible,
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    return (
      <Modal
        title="修改"
        visible={visible}
        onOk={this.onOk.bind(this,1)}
        onCancel={this.onCancel}
        okText="保存"
        cancelText="取消"
      >
        <Form className={styles.center} labelAlign="right" {...formItemLayout}>
          <Form.Item label="姓名">
            {getFieldDecorator('goodsCode', {
              rules: [{ required: true, message: '请输入姓名!' }],
              initialValue: '',
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="年龄">
            {getFieldDecorator('goodsCode', {
              rules: [{ required: true, message: '请输入年龄!' }],
              initialValue: '',
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="地址">
            {getFieldDecorator('residence', {
              initialValue: ['浙江', '杭州', '西湖'],
              rules: [
                { type: 'array', required: true, message: '请选择地址!' },
              ],
            })(<Cascader options={residences} placeholder="请选择地址" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default EditTabLine;