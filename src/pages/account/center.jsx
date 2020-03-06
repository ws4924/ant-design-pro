import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Radio,
  Select,
  DatePicker,
  TimePicker,
  Upload,
  Alert,
  Row,
  Col,
  Checkbox,
  message,
  Modal,
  Button,
  AutoComplete,
  Card,
} from 'antd';

import citys from '@/components/CitySelection';  //city json 引入
import styles from './style.less';

const residences = citys;  //省市选择组件

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Form.create()
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    loading: false,
    value: 1,  //长期非长期
    taxpayerType: '01', // 纳税人类型
    cardFront: [],  //身份证正面
    cardBack: [],  //身份证反面
    taxpayer_img: [],  //营业执照
  };

  // 纳税人类型切换
  handleTaxpayerType = type => {
    this.setState({
      taxpayerType: type,
    });
  };
  
  // 上传方法调用start
  // 上传之前
  beforeUpload = (type, file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传jpg/png格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('上传图片不能超过5M!');
    }
    return isJpgOrPng && isLt2M;
  };
  // 上传
  handleChange = (type, info) => {
    const { maxSize } = this.state;
    let fileList = [];
    if (info.file.status === 'uploading') {
      fileList = info.fileList;
      this.setState({ ['loading${type}']: true });
    }
    if (info.file.status === 'done') {
      this.setState({
        ['loading${type}']: false,
      });
      fileList = info.fileList;
    }
    if (type == 1) {
      this.setState({
        taxpayer_img: fileList.slice(),
      });
    }
    if (type == 2) {
      this.setState({
        cardFront: fileList.slice(),
      });
    }
    if (type == 3) {
      this.setState({
        cardBack: fileList.slice(),
      });
    }
    if (info.file.response && info.file.response.code == 403) {
      message.info('无权限访问');
      return;
    }
    if (info.file.response && info.file.response.code == 200) {
      let data = info.file.response.data;
      return data.uid;
    }
  };

  // 预览图片
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });
  // 上传方法调用end

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { taxpayerType , cardFront, cardBack, taxpayer_img, previewVisible, previewImage } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
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

    const taxpayerUploadButton = (
      <div>
        <Icon type={this.state.loading1 ? 'loading' : 'plus'} />
        <div style={{ width: 100 }} className="ant-upload-text">请上传营业执照</div>
      </div>
    );
    const cardFrontUploadButton = (
      <div>
        <Icon type={this.state.loading2 ? 'loading' : 'plus'} />
        <div style={{ width: 100 }} className="ant-upload-text">身份证正面</div>
      </div>
    );
    const cardBackUploadButton = (
      <div>
        <Icon type={this.state.loading3 ? 'loading' : 'plus'} />
        <div style={{ width: 100 }} className="ant-upload-text">身份证反面</div>
      </div>
    );

    return (
      <Card className={styles.center}>
        <Alert message="请您耐心等待审核结果，等待的过程中，您依然可以正常使用平台进行交易" type="warning" showIcon style={{margin: '0 0 10px 0'}} />
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div>账户信息：</div>
          <Form.Item label="交易身份">区域供应商</Form.Item>
          <Form.Item label="公司类型">供应商</Form.Item>
          <Form.Item label="供货类型">
            {getFieldDecorator('radio-group', {
              initialValue: this.state.value
            })(
              <Radio.Group>
                <Radio value={1}>专项产品</Radio>
                <Radio value={2}>全车配件</Radio>
                <Radio value={3}>综合经营</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="登录账号">chenghe</Form.Item>
          <div>企业信息：</div>
          <Form.Item label="公司名称">
            {getFieldDecorator('company', {
              rules: [
                {
                  required: true,
                  message: '请输入您的公司名称!',
                },
              ],
              validateTrigger: 'onBlur',
            })(<Input placeholder="请输入您的公司名称" />)}
          </Form.Item>
          <Form.Item label="公司所在地">
            {getFieldDecorator('residence', {
              initialValue: ['浙江', '杭州', '西湖'],
              rules: [
                { type: 'array', required: true, message: '请选择您公司的所在地址!' },
              ],
            })(<Cascader options={residences} placeholder="请选择您公司的所在地址" />)}
          </Form.Item>
          <Form.Item label="详细地址">
            {getFieldDecorator('companyAddress', {
              rules: [
                { required: true, message: '请输入您公司的详细地址!'},
              ],
              validateTrigger: 'onBlur',
            })(<Input placeholder="请输入您公司的详细地址" />)}
          </Form.Item>
          <Form.Item label="统一社会信用代码">
            {getFieldDecorator('businessNo', {
              rules: [
                {  required: true, message: '请输入统一社会信用代码!'},
              ],
              validateTrigger: 'onBlur',
            })(<Input />)}
          </Form.Item>
          <Form.Item label="营业执照有效止期">
            {getFieldDecorator('ducumentValidity', {
              initialValue: this.state.value
            })(
              <Radio.Group>
                <Radio value={1}>非长期</Radio>
                <Radio value={2}>长期</Radio>
              </Radio.Group>
            )}
            {this.state.value === 1 && (
              <div><DatePicker showToday={false} /></div>
            )}
          </Form.Item>
          <Form.Item label="营业执照照片">
            {getFieldDecorator('taxpayer_img', {
              rules: [{ required: true, message: '请上传营业执照' }],
              validateTrigger: 'onBlur',
              getValueFromEvent: this.handleChange.bind(this, 1),
              initialValue: '',
            })(
              <Upload
                name="file"
                action="/backend/api/recycler_user/uploadImg"
                listType="picture-card"
                className="avatar-uploader"
                accept="image/*"
                showUploadList={{ showDownloadIcon: false }}
                onPreview={this.handlePreview}
                beforeUpload={this.beforeUpload.bind(this, 1)}
                fileList={taxpayer_img}
              >
                {taxpayer_img.length == 0 && taxpayerUploadButton}
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="法人姓名">
            {getFieldDecorator('legalName', {
              rules: [
                {  required: true, message: '请输入法人姓名!'},
              ],
              validateTrigger: 'onBlur',
            })(<Input />)}
          </Form.Item>
          <Form.Item label="法人身份证号">
            {getFieldDecorator('legalCard', {
              rules: [
                {  required: true, message: '请输入法人身份证号!'},
              ],
              validateTrigger: 'onBlur',
            })(<Input />)}
          </Form.Item>
          <Form.Item label="法人身份证有效止期">
            {getFieldDecorator('legalValidity', {
              initialValue: this.state.value,
              validateTrigger: 'onBlur',
            })(
              <Radio.Group>
                <Radio value={1}>非长期</Radio>
                <Radio value={2}>长期</Radio>
              </Radio.Group>
            )}
            {this.state.value === 1 && (
              <div><DatePicker showToday={false} /></div>
            )}
          </Form.Item>
          <Form.Item label="法人身份证正面照片">
            {getFieldDecorator('cardFront', {
              rules: [{ required: true, message: '请上传法人身份证正面照片' }],
              validateTrigger: 'onBlur',
              getValueFromEvent: this.handleChange.bind(this, 2),
              initialValue: '',
            })(
              <Upload
                name="file"
                action="/backend/api/recycler_user/uploadImg"
                listType="picture-card"
                className="avatar-uploader"
                accept="image/*"
                showUploadList={{ showDownloadIcon: false }}
                onPreview={this.handlePreview}
                beforeUpload={this.beforeUpload.bind(this, 2)}
                fileList={cardFront}
              >
                {cardFront.length == 0 && cardFrontUploadButton}
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="法人身份证反面照片">
            {getFieldDecorator('cardBack', {
              rules: [{ required: true, message: '请上法人身份证反面照片照' }],
              validateTrigger: 'onBlur',
              getValueFromEvent: this.handleChange.bind(this, 3),
              initialValue: '',
            })(
              <Upload
                name="file"
                action="/backend/api/recycler_user/uploadImg"
                listType="picture-card"
                className="avatar-uploader"
                accept="image/*"
                showUploadList={{ showDownloadIcon: false }}
                onPreview={this.handlePreview}
                beforeUpload={this.beforeUpload.bind(this, 3)}
                fileList={cardBack}
              >
                {cardBack.length == 0 && cardBackUploadButton}
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="法人联系电话">
            {getFieldDecorator('agentPhone', {
              rules: [
                {  required: true, message: '请输入法人联系电话!'},
              ],
              validateTrigger: 'onBlur',
            })(<Input />)}
          </Form.Item>
          <Form.Item label="银行账户类型">对公</Form.Item>
          
          <div>财务信息：</div>
          <Form.Item label="纳税人类型">
            {getFieldDecorator('taxpayer_type', {
              initialValue: taxpayerType,
            })(
              <Row gutter={20} type="flex">
                <Col>
                  <Button
                    type={taxpayerType === '01' ? 'primary' : 'ghost'}
                    onClick={this.handleTaxpayerType.bind(this, '01')}>
                    一般纳税人
                  </Button>
                </Col>
                <Col>
                  <Button
                    type={taxpayerType === '02' ? 'primary' : 'ghost'}
                    onClick={this.handleTaxpayerType.bind(this, '02')}>
                    小规模纳税人
                  </Button>
                </Col>
              </Row>,
            )}
          </Form.Item>

          {taxpayerType === '01' && (
            <Form.Item label="纳税人识别编码">
              {getFieldDecorator('taxpayer_code', {
                rules: [
                  { required: true, message: '请输入纳税人识别编码' },
                  {
                    pattern: /^[a-zA-Z0-9]{15,20}$/,
                    message: '请输入15-20位有效数字或者字母',
                  },
                ],
                validateTrigger: 'onBlur',
              })(<Input />)}
            </Form.Item>
          )}
          <Form.Item label="开户银行名称">
            {getFieldDecorator('bank_name', {
              rules: [
                { required: true, message: '请输入开户银行名称' },
                {
                  min: 2,
                  message: '请输入2-30个字符,可输入汉字、数字、英文、符号',
                },
              ],
              validateTrigger: 'onBlur',
            })(<Input />)}
          </Form.Item>
          <Form.Item label="银行账户">
            {getFieldDecorator('hbankAccount', {
              rules: [
                { required: true, message: '请输入银行账户' }
              ],
              validateTrigger: 'onBlur',
            })(<Input />)}
          </Form.Item>
          {taxpayerType === '01' && (
            <Form.Item label="公司地址">
              {getFieldDecorator('hbankAccount', {
                rules: [
                  { required: true, message: '请输入公司地址' }
                ],
                validateTrigger: 'onBlur',
              })(<Input />)}
            </Form.Item>
          )}
          {taxpayerType === '02' && (
            <Form.Item label="开户手机">
              {getFieldDecorator('sopenAccountTell', {
                rules: [
                  { required: true, message: '请输入开户手机' }
                ],
                validateTrigger: 'onBlur',
              })(<Input />)}
            </Form.Item>
          )}
          <Form.Item label="公司电话">
            {getFieldDecorator('companyTel', {
            })(<Input />)}
          </Form.Item>
          <Form.Item label="收件人">
            {getFieldDecorator('receiveName', {
            })(<Input />)}
          </Form.Item>
          <Form.Item label="收件人电话">
            {getFieldDecorator('receiveTel', {
            })(<Input />)}
          </Form.Item>
          <Form.Item label="收件地址">
            {getFieldDecorator('receiveAddress', {
            })(<Input />)}
          </Form.Item>
          {taxpayerType === '01' && (
            <Form.Item label="服务费收取方式">
              {getFieldDecorator('serviceChargeMode', {
                rules: [
                  { required: true, message: '请输入服务费收取方式' }
                ],
                validateTrigger: 'onBlur',
              })(<Input />)}
              <span className="ant-col-red">修改此条信息，请联系客服！</span>
            </Form.Item>
          )}
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
            style={{ textAlign: 'center' }}
          >
            <img alt="example" style={{ maxWidth: '100%', maxHeight: '100%' }} src={previewImage} />
          </Modal>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              申请修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default RegistrationForm;
