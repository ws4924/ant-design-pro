import { Badge, Tooltip, Col, Descriptions } from 'antd';
import { Link } from 'umi';
import moment from 'moment';

const columns = onEdit => {
  return [
    {
      title: '序号',
      dataIndex: 'id',
      fixed: 'left',
      width: 60,
    },
    {
      title: '配件名称',
      dataIndex: 'lowcarbonName',
      width: 150,
      render: (text,record) => {
        return (
          <Link 
            to={`detail?id=${record.id}`} 
            target="_blank"
          >
            {text}
          </Link>
        );
      },
    },
    {
      title: '编码',
      dataIndex: 'lowcarbonCode',
      width: 150,
    },
    {
      title: '地址',
      dataIndex: 'lowcarbonFactoryName',
      render: text => {
        return (
          <Tooltip placement="top" title={text}>
            <div className="ellipsis">{text}</div>
          </Tooltip>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
      render: text => text && moment(parseInt(text)).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '上传时间',
      dataIndex: 'updateTime',
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'edit',
      fixed: 'right',
      width: 150,
      render: (text, record, index) => {
        return (
          <>
            <a onClick={() => onEdit(record)}>修改</a>
          </>
        );
      },
    },
  ]
}

const tab3Columns = [
  {
    title: '配件',
    dataIndex: 'partZSName',
    render: (text, record) => {
      return (
        <div>
          <Tooltip placement="top" title={
            <>
              配件名称：{text} <br />
              配件OE：{record.tradeNo} <br />
              供应商名称：{record.supplierName} <br />
              修理厂名称：{record.repairName}
            </>}
          >
            <div className="ellipsis">
              <div>{text}</div>
              <div>{record.tradeNo}</div>
              <div>{record.supplierName}</div>
            </div>
          </Tooltip>
        </div>
      )
    },
  },
  {
    title: '单价',
    dataIndex: 'taxPrice',
    align: 'center',
  },
  {
    title: '数量',
    dataIndex: 'daifaPartNum',
    align: 'center',
  },
  {
    title: '合计',
    dataIndex: 'total',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'edit',
    align: 'center',
    width: 150,
    render: (text, record, index) => {
      return (
        <>
          <a>修改</a>
        </>
      );
    },
  },
]

const tab4Columns = [
  {
    title: '',
    dataIndex: 'orderId',
    render: (text, record) => {
      return (
        <div>
          <Col style={{display:"table"}}>
            <Col span={8}>订单编号：{text}</Col>
            <Col span={8}>车牌号：{record.licenseNo}</Col>
            <Col span={8}>下单时间：{moment(parseInt(record.payDate)).format('YYYY-MM-DD HH:mm:ss')}</Col>
            <Col span={8}>车型：{record.damageCarName}</Col>
            <Col span={8}>保险公司：{record.companyName}</Col>
            <Col span={8}>维修企业：{record.repairName}</Col>
            <Col span={8}>撮合账期 <span style={{color:'#ff0000'}}>{record.taxPrice}</span> 元</Col>
            <Col span={8}>驾驶室总成 <span style={{color:'#ff0000'}}>{record.forceChoice}</span> 个配件</Col>
            <Col span={8}></Col>
          </Col>
          <div style={{paddingTop:"5px",borderTop:"1px solid #e8e8e8"}}>订单编号：{text}</div>
        </div>
      )
    },
  },
]

const tab5Columns = [
  {
    title: '配件',
    dataIndex: 'partZSName',
    render: (text, record) => {
      return (
        <div>
          <Tooltip placement="top" title={
              <>
                配件名称：{record.partName} <br />
                配件OE：{record.orderId} <br />
                修理厂名称：{record.serviceSupplierName}
              </>
            }
          >
            <div className="ellipsis">
              <div>{record.partName}</div>
              <div>{record.orderId}</div>
              <div>{record.serviceSupplierName}</div>
            </div>
          </Tooltip>
        </div>
      )
    },
  },
  {
    title: '单价',
    dataIndex: 'ptPrice',
    align: 'center',
  },
  {
    title: '数量',
    dataIndex: 'num',
    align: 'center',
  },
  {
    title: '合计',
    dataIndex: 'salePrice',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'edit',
    align: 'center',
    width: 150,
    render: (text, record, index) => {
      return (
        <>
          <a>修改</a>
        </>
      );
    },
  },
]

export { columns, tab3Columns, tab4Columns, tab5Columns };