import {
  Form, AutoComplete,
} from 'antd';
import MessageContent from './components/messageContent';
import styles from './style.less';

class List extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      }
    }

    return (
      <div className={styles.center} style={{width:'60%',margin:'0 auto'}}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div>税务信息：</div>
          <div>开票信息：</div>
          <Form.Item label="发票抬头">区域供应商</Form.Item>
          <Form.Item label="纳税人识别码">供应商</Form.Item>
          <Form.Item label="注册地址">北京市SOHOB座3座</Form.Item>
          <Form.Item label="注册电话">18656565263</Form.Item>
          <Form.Item label="开户银行">招商招商</Form.Item>
          <Form.Item label="银行账户">62</Form.Item>
          <div>银行账户（线下支付）：</div>
          <Form.Item label="开户银行">111</Form.Item>
          <Form.Item label="支行名称">招商支行</Form.Item>
          <Form.Item label="银行账号">111</Form.Item>
          <Form.Item label="开户手机号">18656565263</Form.Item>
          <div style={{margin:'0 0 10px 0'}}>财务人员列表：</div>
        </Form>
        <MessageContent />
      </div>
    );
  }
}

export default List;