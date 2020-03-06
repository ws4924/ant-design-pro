import { Form, Input, Button, message, } from 'antd';
import styles from './style.less';

@Form.create()
class FormPassword extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      password: this.props.password || '',  //原密码
      rpassword: this.props.rpassword || '',
      newpassword: this.props.newpassword || '',
      passwordA: '1234' //原密码
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  save = e => {
    console.log(this.state.passwordA)
    console.log(this.state.password)
    if(this.state.password === '') {
      message.warn("请输入您的原密码！")
      return
    } else if(this.state.password != this.state.passwordA) {
      message.warn("原密码输入不正确")
      return
    } else if(this.state.rpassword === '') {
      message.warn("请输入您的新密码！")
      return
    } else if(this.state.rpassword != this.state.newpassword) {
      message.warn("两次输入的密码不正确！")
      return
    }
    message.success("修改成功！")
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    }, () => {
      // console.log(this.state)
    })
  }

  handleInputChanges = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    }, () => {
      // console.log(this.state)
    })
  }

  handleInputChangeNew = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    }, () => {
      // console.log(this.state)
    })
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form className={styles.center} {...formItemLayout}>
        <Form.Item label="原密码">
          <Input name="password" value={this.state.password} placeholder="请输入您的原密码！" onChange={this.handleInputChange} />
        </Form.Item>
        <Form.Item label="新密码">
          <Input name="rpassword" value={this.state.rpassword} placeholder="请输入您的新密码！" onChange={this.handleInputChanges} />
        </Form.Item>
        <Form.Item label="确认密码">
          <Input name="newpassword" value={this.state.newpassword} placeholder="请确认您的新密码！" onChange={this.handleInputChangeNew} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" onClick={this.save}>
            确认修改
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default FormPassword;