import { Form, Input, Button, message, } from 'antd';
import styles from './style.less';

@Form.create()
class FormPhone extends React.Component {
  constructor(props) {  //构造函数
    super(props)
    console.log(props)

    this.state = {
      phone: this.props.phone || '',
      phones: this.props.phones || '',
      mobile_code: this.props.mobile_code || '',
      mobile_codes: this.props.mobile_codes || '',
      count: 59,
      counts: 59,
      liked: true,
      likeds: true
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  save = e => {
    if(this.state.phone === '') {
      message.warn("请先输入原手机号")
      return
    } else if(!(/^1[34578]\d{9}$/.test(this.state.phone))) {
      message.warn("原手机号格式不正确")
      return
    } else if(this.state.mobile_code === '') {
      message.warn("请先输入验证码")
      return
    } else if(this.state.phones === '') {
      message.warn("请先输入新手机号")
      return
    } else if(!(/^1[34578]\d{9}$/.test(this.state.phones))) {
      message.warn("新手机号格式不正确")
      return
    } else if(this.state.mobile_codes === '') {
      message.warn("请先输入验证码")
      return
    }
  }

  //获取短信验证码
  handleClick = e => {
    if (!this.state.liked) {
      return
    }

    if(this.state.phone === '') {
      message.warn("请先输入手机号")
      return
    } else if(!(/^1[34578]\d{9}$/.test(this.state.phone))) {
      message.warn("手机号格式不正确")
      return
    } else {
      console.log("点击获取验证码")
      console.log(this.state.liked)
      let count = this.state.count
      console.log(count)
      const timer = setInterval(() => {
        this.setState({ count: (count--), liked: false }, () => {
          if (count === 0) {
            clearInterval(timer);
            this.setState({
              liked: true ,
              count: 59
            })
          }
        });
      }, 1000);
    }
  }

  handleClicks = e => {
    if (!this.state.likeds) {
      return
    }

    if(this.state.phones === '') {
      message.warn("请先输入手机号")
      return
    } else if(!(/^1[34578]\d{9}$/.test(this.state.phones))) {
      message.warn("手机号格式不正确")
      return
    } else {
      console.log("点击获取验证码")
      console.log(this.state.likeds)
      let counts = this.state.counts
      console.log(counts)
      const timer = setInterval(() => {
        this.setState({ counts: (counts--), likeds: false }, () => {
          if (counts === 0) {
            clearInterval(timer);
            this.setState({
              likeds: true ,
              counts: 60
            })
          }
        });
      }, 1000);
    }
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

  render() {
    const { getFieldDecorator } = this.props.form;

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
        <Form.Item label="原手机号">
          <Input name="phone" value={this.state.phone} placeholder="请输入您的原手机号！" maxLength={11} onChange={this.handleInputChange} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Input type="tel" placeholder="请输入验证码" maxLength={4} name="mobile_code" value={this.state.mobile_code} onChange={this.handleInputChange} style={{width: '50%',marginRight: '20px'}} />
          {
            this.state.liked ? 
            <Button onClick={this.handleClick}>获取验证码</Button>
            : 
            <Button type="primary" className="count_second">{this.state.count + 's'}</Button> 
          }
        </Form.Item>

        <Form.Item label="新手机号">
        <Input name="phones" value={this.state.phones} placeholder="请输入您的原手机号！" maxLength={11} onChange={this.handleInputChanges} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
        <Input type="tel" placeholder="请输入验证码" maxLength={4} name="mobile_codes" value={this.state.mobile_codes} onChange={this.handleInputChanges} style={{width: '50%',marginRight: '20px'}} />
          {
            this.state.likeds ? 
            <Button onClick={this.handleClicks}>获取验证码</Button>
            : 
            <Button type="primary" className="count_second">{this.state.counts + 's'}</Button> 
          }
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

export default FormPhone;