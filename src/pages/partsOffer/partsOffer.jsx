import React from 'react';
import {PageHeader, Table, Button, Form, Row, Col, Select, Tooltip, Icon, Descriptions, } from 'antd';
import { columns } from './columns';
import RemarkModal from './modal';
import styles from './style.less';
import ImgPreview from '@/components/ImgPreview';//图片预览 引入

const data = [];
for (let i = 1; i < 16; i++) {
  data.push({
    key: i,
    partName: `配件 ${i}`,
    num: 32,
    code: `20910-23C30`,
    brandPrice: `品牌价`,
    partRemark: `配件标记`,
    price: ``,
    price1: ``,
    price2: ``,
    brand: `2`,
    brand1: `1`,
    brand2: `2`,
    business_type: `向邦邦开票`,
    cause: `未报价说明`,
    flag: `非现货`,
    remark: `备注备注${i}`,
  });
}

class TableList extends React.Component {
  constructor(props) {  //构造函数，用来初始化state
    super(props);  //定义其子类的构造函数时，都需要调用 super 方法,构造函数必须以 super(props) 开头。
    this.state = {
      loading: false,
      remark_img: [],  //营业执照
      visible: false,
      radioVal: null,
      previewVisibles: false,
      offerFlag: 4,
      licenceUrl: [
        {
          key: '1',
          url: 'https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg',
        },
        {
          key: '2',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          key: '3',
          url: 'https://t8.baidu.com/it/u=581096476,2560083681&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg',
        },
        {
          key: '4',
          url: 'https://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg',
        },
      ],
    };

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    //this.onRemarkBtn = this.onRemarkBtn.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.SelectRef = this.SelectRef.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.onKeyDown)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyDown)
  }

  SelectRef = (e) => {
    this.setState(() =>{
      console.log(e);
      e.focus();
    })
  }

  onKeyDown = (e) => {
    var partIndex = Number(e.target.getAttribute("data-partindex"));
    switch( e.keyCode) {
      case 38: //上
        partIndex -= 100;
        console.log( e.keyCode )
        break;
      case 40: //下
        partIndex += 100;
        console.log( e.keyCode )
        break;
      case 37: //左(会导致输入时无法使用左右移)  
        partIndex -= 1;
        console.log( e.keyCode )
        break;
      case 39: //右(会导致输入时无法使用左右移)
        partIndex += 1;
        console.log( e.keyCode )
        break;
      default:
        return;
    }
    if (partIndex > 0) {
      var keydownInp = document.getElementsByClassName("keydownInp");
      for(var i = 0;i < keydownInp.length;i++){
        var num = Number(keydownInp[i].getAttribute("data-partindex"));
        if(num == partIndex){
          console.log("FocusInput");
          keydownInp[i].focus();
        }
        if(keydownInp[i].children[0] != undefined){
          var numChildren = Number(keydownInp[i].children[0].getAttribute("data-partindex"));
          if(numChildren == partIndex){
            this.SelectRef(keydownInp[i].children[0]);
            console.log("FocusSelect");
          }
        }
      }
      //$(".keydownInp[partindex=" + partIndex + "]").focus();
      return false;
    }
    return true;
    if (e.keyCode == 13) {    
      partIndex += 100;
      e.target.focus();
    }
  }

  onImgVisibles = (img) => {
    window.document.body.style.overflow = "hidden";
    this.setState({
      previewVisibles: true,
      selectImg: img
    });
  }
  closePreview = (value) => {
    window.document.body.style.overflow = "auto";
    this.setState({
      previewVisibles: value,
    });
  }

  downSelect1 = (currentPageData) => {
    return (
      <Select defaultValue="原厂件" style={{ width: 120,color: '#ff0000' }}>
        <Option value="01">原厂件</Option>
        <Option value="03">配套件</Option>
        <Option value="04">流通原厂建</Option>
        <Option value="05">配套品牌件</Option>
        <Option value="06">售后品牌件</Option>
        <Option value="07">经济适用件</Option>
      </Select>
    )
  }

  downSelect2 = (currentPageData) => {
    return (
      <Select defaultValue="配套品牌件" style={{ width: 120,color: '#ff0000' }}>
        <Option value="01">原厂件</Option>
        <Option value="03">配套件</Option>
        <Option value="04">流通原厂建</Option>
        <Option value="05">配套品牌件</Option>
        <Option value="06">售后品牌件</Option>
        <Option value="07">经济适用件</Option>
      </Select>
    )
  }

  downSelect3 = (currentPageData) => {
    return (
      <Select defaultValue="配套件" style={{ width: 120,color: '#ff0000' }}>
        <Option value="01">原厂件</Option>
        <Option value="03">配套件</Option>
        <Option value="04">流通原厂建</Option>
        <Option value="05">配套品牌件</Option>
        <Option value="06">售后品牌件</Option>
        <Option value="07">经济适用件</Option>
      </Select>
    )
  }

  // 显示modal
  onShowModal = values => {
    console.log(values)
    console.log('显示modal')
    this.setState({
      visible: true,
      detail: values,
    });
  };

  hideModal = values => {
    console.log('取消');
    console.log(values)
    this.setState({
      visible: values,
    });
  };

  handleOk = values => {
    console.log('确定');
    console.log(values)
    this.setState({
      visible: values,
    });
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
    this.setState({
      remark_img: fileList.slice(),
    });
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

  //复选框选中方法
  onSelectChange = () => {
    alert(1)
  }

  //非现货复选框选中方法
  onCheck = e => {
    console.log('非现货件标记', e.target.checked);
  }

  //业务类型单选框选中方法
  onChangeRadio = e => {
    console.log('业务类型 radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = () => {
    console.log(this);
  }

  render() {
    const {
      loading,
      toggle,
      remark_img,
      visible,
      radioVal,
      offerFlag,
      licenceUrl,
      previewVisibles,
      selectImg
    } = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    let offerFlags;
    if(this.state.offerFlag == 1){
      offerFlags = (
        <Button type="primary">报价完成</Button>
      )
    }else if(this.state.offerFlag == 2){
      offerFlags = (
        <Button>报价中</Button>
      )
    }else if(this.state.offerFlag == 3){
      offerFlags = (
        <Button type="dashed">等待报价</Button>
      )
    }else{
      offerFlags = (
        <Button type="danger">报价失败</Button>
      )
    }

    return (
      <>
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '10px',
          paddingBottom: '10px',
          borderBottom:'1px dashed rgb(235, 237, 240)',
          }}
        >询价单基础信息
          <span style={{float:'right'}}>
            { offerFlags }
          </span>
        </div>
        <Descriptions
          column={{ xxl: 4, xl: 4, lg: 2, md: 2, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="询价单号">EQ2020011300003</Descriptions.Item>
          <Descriptions.Item label="接收时间">2020-01-13 15:16:20</Descriptions.Item>
          <Descriptions.Item label="车牌号">云D387639</Descriptions.Item>
          <Descriptions.Item label="报案号">RDAA202012372828273282</Descriptions.Item>
          <Descriptions.Item label="车型名称">梅赛德斯-奔驰 奔驰B级 两厢 2.0L CVT (BENZ B200)</Descriptions.Item>
          <Descriptions.Item label="保险公司">保险公司</Descriptions.Item>
          <Descriptions.Item label="VIN">WDDFH3DB6BJ651118</Descriptions.Item>
          <Descriptions.Item label="定损员信息">测试人员</Descriptions.Item>
          <Descriptions.Item label="厂家品牌">梅赛德斯-奔驰</Descriptions.Item>
          <Descriptions.Item label="修理厂地区">北京市北京市东城区</Descriptions.Item>
          <Descriptions.Item label="询价说明">北京市北京市东城区</Descriptions.Item>
          <br />
          <Descriptions.Item label="图片">
            {licenceUrl.map((item) => (
              <img
                key={item.key}
                style={{ width: '100px', height: '100px',marginRight: '10px', verticalAlign: 'top', cursor: 'pointer'}}
                onClick={this.onImgVisibles.bind(this, item)}
                alt="example"
                src={item.url}
              />
            ))}
          </Descriptions.Item>
        </Descriptions>
        <Form>
          <Table
            className={styles.partsOffer}
            rowSelection={rowSelection}
            columns={columns(this.onShowModal, this.onCheck, this.onChangeRadio,this.downSelect1,this.downSelect2,this.downSelect3,this.onKeyDown)}
            dataSource={data}
            bordered={true}
            pagination={false}
            size="small"
            scroll={{x:1600}}
          />

          <Row gutter={20} type="flex" justify="center">
            <Col>
              <Button>
                返回
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={this.handleSubmit}>
                确定
              </Button>
            </Col>
          </Row>
        </Form>
        <RemarkModal
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
        />

        {selectImg && <ImgPreview
          visible={previewVisibles}  // 是否可见
          onClose={this.closePreview} // 关闭事件
          src={selectImg.url} // 图片url
          picKey={selectImg.key} // 下载需要的key，根据自己需要决定
          isAlwaysCenterZoom={false} // 是否总是中心缩放，默认false，若为true，每次缩放图片都先将图片重置回屏幕中间
          isAlwaysShowRatioTips={false} // 是否总提示缩放倍数信息，默认false，只在点击按钮时提示，若为true，每次缩放图片都会提示
        />}
      </>
    );
  }
}

export default TableList;