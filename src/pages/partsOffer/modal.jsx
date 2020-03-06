import React, { Component } from 'react';
import { Modal, Cascader, Form, message, Input, Select, Upload, Icon } from 'antd';
import citys from '@/components/CitySelection';  //city json 引入
import styles from './style.less';

const { Option } = Select;
const residences = citys;  //省市选择组件

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Form.create()
class remarkModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false, // 是否隐藏/显示新增弹窗
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ],
    };

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.onOk = this.onOk.bind(this);
  }

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

  handleCancel = () => this.setState({ previewVisible: false });

  //预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  // 上传方法调用end
  
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
    const { previewVisible, previewImage, fileList } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    const imgUploadButton = (
      <div>
        <Icon type={this.state.loading1 ? 'loading' : 'plus'} />
      </div>
    );

    return (
      <Modal
        title="修改"
        visible={visible}
        onOk={this.onOk.bind(this,1)}
        onCancel={this.onCancel}
        okText="保存"
        cancelText="取消"
      >
        <Form>
          <Form.Item label="">
            <Upload
              name="file"
              action="/backend/api/recycler_user/uploadImg"
              listType="picture-card"
              className="avatar-uploader"
              accept="image/*"
              showUploadList={{ showDownloadIcon: false }}
              onChange={this.handleChange}
              onPreview={this.handlePreview}
              beforeUpload={this.beforeUpload.bind(this, 1)}
              fileList={fileList}
            >
              {fileList.length >= 10 ? null : imgUploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default remarkModal;