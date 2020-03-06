import React, { Component } from 'react';
import { Modal, Table, Button, Divider, Tag, Row, Col, Form, Input, Select, DatePicker } from 'antd';
import { Link } from 'umi';
import {columns} from './columns';
import Tab1Modal from './tab1Modal';
import styles from './../style.less';

const data = {
	"status": 0,
  "statusText": "Success",
  "data":{
    "evalId": null,
    "type": null,
    "carVo": null,
    "factoryVo": null,
    "factoryBrandVos": null,
    "partVos": null,
    "repairVos": null,
    "lowcarbonVos":[{
      "id": 3022,
      "evalId": 4159,
      "lowcarbonId": "42299",
      "lowcarbonName": "车身线束（右）",
      "lowcarbonCode": "X036402",
      "evalPartPrice": 438.09,
      "materialType": "M1",
      "discountBeforePrice": null,
      "lowCarbonFloatRatio": 1.99,
      "evalPrice": 267.85,
      "evalLocalPrice": 933.71,
      "evalRefPrice": null,
      "evalLowcarbonSum": 267.85,
      "evalLowcarbonSumFirst": 0,
      "evalState": "A",
      "evalDecrease": 170.24,
      "evalItemDiscount": 28.69,
      "evalRemark": "",
      "localPartPrice": 394.68,
      "priceSchemeCode": "MARKET_PRICE",
      "apprPrice": null,
      "apprMaterialType": null,
      "apprLocalPrice": null,
      "apprLowcarbonSum": null,
      "apprDecrease": null,
      "apprItemDiscount": null,
      "apprDelFlag": null,
      "apprState": null,
      "apprRemark": null,
      "handAddFlag": "0",
      "delFlag": "0",
      "priceCeiling": 400,
      "lowcarbonFactoryCode": "3502731000309",
      "lowcarbonFactoryName": "厦门市同安区精诚顺汽车维修店",
      "lowCarbonOriAmount": 1,
      "lowCarbonAmount": 1,
      "lowCarbonMaxPrice": null,
      "oriMaterialType": null,
      "extendFlag": null,
      "partId": null,
      "refPartId": null,
      "serialNo": 1,
      "lpSerialNo": 15,
      "lpSendFlag": "1",
      "losstoolSendFlag": "0",
      "updateBy": null,
      "createBy": null,
      "createTime": "2019-11-04T02:43:22.598+0000",
      "updateTime": "2019-11-18T06:50:03.922+0000",
      "singleQuantity": 1,
      "factPartCode": "240146FV1C-B119",
      "factPartName": "车身线束（右）",
      "refPartPrice": 506,
      "partAlias": null,
      "standardPartCode": "036402",
      "standardPartName": null,
      "estiPrice": null,
      "estiLocalPrice": null,
      "estiRefPrice": null,
      "estiLowcarbonSum": null,
      "estiDecrease": null,
      "estiItemDiscount": null,
      "estiRemark": null,
      "estiState": null,
      "estiMaterialType": null,
      "piccLowcarbonName": "车身线束（右）",
      "piccLowcarbonCode": "20202404",
      "lowcarbonImgUrl": null,
      "factPartShortCode": "240146FV1CB119",
      "lossLowcarbonId": null,
      "thirdLowcarbonId": null,
      "operationStatus": null,
      "quantity": null,
      "lowcarbonRemark": null,
      "remark": "",
      "evalBatchNo": null,
      "estiBatchNo": null,
      "apprBatchNo": null,
      "estiLowCarbonAmount": null,
      "apprLowCarbonAmount": null,
      "payeeName": null,
      "bankName": null,
      "bankCode": null,
      "recBankAreaCode": null,
      "recBankAreaName": null,
      "openBankName": null,
      "openBankCode": null,
      "uniteBankCode": null,
      "bankAccount": null,
      "telNo": null,
      "identityType": null,
      "identityNo": null,
      "comCode": null,
      "orderNo": null,
      "taskStatus": null,
      "taskRepairPrice": null,
      "garageName": null,
      "garageContactName": null,
      "garageContactTel": null,
    }, {
      "id": 3024,
      "evalId": 4158,
      "lowcarbonId": "42299",
      "lowcarbonName": "车身线束（右）123",
      "lowcarbonCode": "X036402",
      "evalPartPrice": 438.09,
      "materialType": "M1",
      "discountBeforePrice": null,
      "lowCarbonFloatRatio": 1.99,
      "evalPrice": 267.85,
      "evalLocalPrice": 933.71,
      "evalRefPrice": null,
      "evalLowcarbonSum": 267.85,
      "evalLowcarbonSumFirst": 0,
      "evalState": "A",
      "evalDecrease": 170.24,
      "evalItemDiscount": 28.69,
      "evalRemark": "",
      "localPartPrice": 394.68,
      "priceSchemeCode": "MARKET_PRICE",
      "apprPrice": null,
      "apprMaterialType": null,
      "apprLocalPrice": null,
      "apprLowcarbonSum": null,
      "apprDecrease": null,
      "apprItemDiscount": null,
      "apprDelFlag": null,
      "apprState": null,
      "apprRemark": null,
      "handAddFlag": "0",
      "delFlag": "0",
      "priceCeiling": 400,
      "lowcarbonFactoryCode": "3502731000309",
      "lowcarbonFactoryName": "厦门市同安区精诚顺汽车维修店",
      "lowCarbonOriAmount": 1,
      "lowCarbonAmount": 1,
      "lowCarbonMaxPrice": null,
      "oriMaterialType": null,
      "extendFlag": null,
      "partId": null,
      "refPartId": null,
      "serialNo": 1,
      "lpSerialNo": 15,
      "lpSendFlag": "1",
      "losstoolSendFlag": "0",
      "updateBy": null,
      "createBy": null,
      "createTime": "2019-11-04T02:43:22.598+0000",
      "updateTime": "2019-11-18T06:50:03.922+0000",
      "singleQuantity": 1,
      "factPartCode": "240146FV1C-B119",
      "factPartName": "车身线束（右）",
      "refPartPrice": 506,
      "partAlias": null,
      "standardPartCode": "036402",
      "standardPartName": null,
      "estiPrice": null,
      "estiLocalPrice": null,
      "estiRefPrice": null,
      "estiLowcarbonSum": null,
      "estiDecrease": null,
      "estiItemDiscount": null,
      "estiRemark": null,
      "estiState": null,
      "estiMaterialType": null,
      "piccLowcarbonName": "车身线束（右）",
      "piccLowcarbonCode": "20202404",
      "lowcarbonImgUrl": null,
      "factPartShortCode": "240146FV1CB119",
      "lossLowcarbonId": null,
      "thirdLowcarbonId": null,
      "operationStatus": null,
      "quantity": null,
      "lowcarbonRemark": null,
      "remark": "",
      "evalBatchNo": null,
      "estiBatchNo": null,
      "apprBatchNo": null,
      "estiLowCarbonAmount": null,
      "apprLowCarbonAmount": null,
      "payeeName": null,
      "bankName": null,
      "bankCode": null,
      "recBankAreaCode": null,
      "recBankAreaName": null,
      "openBankName": null,
      "openBankCode": null,
      "uniteBankCode": null,
      "bankAccount": null,
      "telNo": null,
      "identityType": null,
      "identityNo": null,
      "comCode": null,
      "orderNo": null,
      "taskStatus": null,
      "taskRepairPrice": null,
      "garageName": null,
      "garageContactName": null,
      "garageContactTel": null,
    }],
    "materialVos": null,
    "lossUserRole": null,
    "trajectoryCarVos": null,
    "trajectoryPartVos": null,
    "trajectoryLowcarbonVos": null,
    "trajectoryRepairVos": null,
    "trajectoryMaterialVos": null,
    "hisCarVos": null,
    "pageHisCarVo": null,
    "carModerDetailNum": null,
    "registVo": null,
    "lowcarbonTask": null,
  }
}
const { Option } = Select;

@Form.create()
class TableList extends React.Component {
  constructor(props) {  //构造函数，用来初始化state
    super(props);  //定义其子类的构造函数时，都需要调用 super 方法,构造函数必须以 super(props) 开头。
    this.state = {
      loading: false,
      toggle: false,
      visible: false, // 是否隐藏/显示新增弹窗
    };

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.onShowModal = this.onShowModal.bind(this);
  }

  // 展开/收起
  handleToggle = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
  };

  // 搜索
  handleSearch = () => {
    console.log('搜索');
  };

  // 重置
  handleReset = () => {
    this.props.form.resetFields();
    this.handleSearch();
  };

  // 显示modal
  onShowModal = values => {
    this.setState({
      visible: true,
      detail: values,
    });
  };

  hideModal = values => {
    console.log('tab取消');
    this.setState({
      visible: values,
    });
  };

  handleOk = values => {
    console.log('tab确定');
    this.setState({
      visible: values,
    });
  }

  render() {
    const { 
      form: { getFieldDecorator }
    } = this.props;
    const { loading, toggle, visible} = this.state;
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
      <>
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
            <Button style={{ float: 'left' }} type="primary" onClick={this.onShowModal.bind(this, null)}>
              新增
            </Button>{' '}
            <Button type="primary" onClick={this.handleSearch}>
              查询
            </Button>{' '}
            <Button onClick={this.handleReset}>重置</Button>
            <a style={{ marginLeft: 10 }} onClick={this.handleToggle.bind(this)}>
              {!toggle ? '展开' : '收起'}
            </a>
          </Form.Item>
        </Form>
        <Table
          rowSelection={rowSelection}
          columns={columns(this.onShowModal)}
          isloading={loading}
          bordered={true}
          dataSource={data.data.lowcarbonVos}
          rowKey="id"
          size="small"
          scroll={{ x: 1300 }}
          onRow = {(record) => {
            return {
              onClick: () => {
                console.log(record)
                }
              }
            }
          }
        />
        <Tab1Modal
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
        />
      </>
    );
  }
}

export default TableList;