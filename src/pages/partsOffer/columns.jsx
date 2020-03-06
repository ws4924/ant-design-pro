import { Button, Input, Select, Tooltip, Icon, Radio, Checkbox, Upload} from 'antd';

const { Option } = Select;

const columns = (remarkImg,onChange,onChangeRadio,downSelect1,downSelect2,downSelect3,onKeyDown,mySelectRef) => {
  return [
    {
      title: <Tooltip title="title内容">配件信息</Tooltip>,
      dataIndex: 'partName',
      onFilter: (value, record) => record.name.includes(value),
      render: (text, record, index) => {
        return (
          <>
            <span style={{ color:'#ff1111',marginRight:11 }}>{text}</span>
            <span style={{ marginRight:11 }}>{record.code}</span>
            x<span style={{ color:'#ff1111' }}>{record.num}</span>
            <br/>
            <span style={{ marginRight:11 }}>{record.brandPrice}</span>
            <span>{record.remark}</span>
          </>
        );
      },
    },
    {
      title:downSelect1(),
      children:[
        {
          title: '单价',
          dataIndex: 'price',
          align: 'center',
          render: (text, record, index) => {
            return (
              <>
                <Input className="keydownInp" onKeyDown={e=> console.log( e.keyCode ) } data-partindex={index+"01"} style={{ width: 51, padding: 4 }} />
              </>
            );
          },
        },{
          title: '配件品牌',
          dataIndex: 'brand',
          align: 'center',
          render: (text, record, index) => {
            const textCon = {
              '1' : <Input className="keydownInp" ref="theInput" data-partindex={index+"02"} style={{ width: 80, padding: 4 }} />,
              '2' : <Select className="keydownInp" defaultValue='请选择' style={{width:121}} data-partindex={index+"02"}>
                      <Option value="0">请选择</Option>
                      <Option value="1" title="配件信息不明确">配件信息不明确</Option>
                      <Option value="2" title="配件缺货">配件缺货</Option>
                      <Option value="3" title="配件重复">配件重复</Option>
                      <Option value="4" title="总成件已包括">总成件已包括</Option>
                      <Option value="5" title="此配件不属于该车型">此配件不属于该车型</Option>
                      <Option value="6" title="非单品直供">非单品直供</Option>
                      <Option value="7" title="其他（请备注）">其他（请备注）</Option>
                    </Select>,
            }
            return textCon[text];
          },
        }
      ]    
    },
    {
      title:downSelect2(),
      children:[
        {
          title: '单价',
          dataIndex: 'price1',
          align: 'center',
          render: (text, record, index) => {
            return (
              <>
                <Input className="keydownInp" style={{ width: 51, padding: 4 }} data-partindex={index+"03"} />
              </>
            );
          },
        },{
          title: '配件品牌',
          dataIndex: 'brand1',
          align: 'center',
          render: (text, record, index) => {
            return (
              <>
                <Input className="keydownInp" data-partindex={index+"04"} style={{ width: 80, padding: 4 }} />
              </>
            );
          },
        }
      ]    
    },
    {
      title:downSelect3(),
      children:[
        {
          title: '单价',
          dataIndex: 'price2',
          align: 'center',
          render: (text, record, index) => {
            return (
              <>
                <Input className="keydownInp" style={{ width: 51, padding: 4 }} data-partindex={index+"05"} />
              </>
            );
          },
        },{
          title: '配件品牌',
          dataIndex: 'brand2',
          align: 'center',
          render: (text, record, index) => {
            return (
              <>
                <Input className="keydownInp" data-partindex={index+"06"} style={{ width: 80, padding: 4 }} />
              </>
            );
          },
        }
      ]
    },
    {
      title: '业务类型',
      dataIndex: 'business_type',
      align: 'center',
      render: (text, record, index) => {
        return (
          <div style={{textAlign:'left'}}>
            <Radio.Group onChange={onChangeRadio}>
              <Radio value={1}>向邦邦开票</Radio><br />
              <Radio value={2}>向维修企业开票</Radio>
            </Radio.Group>
          </div>
        );
      },
    },
    {
      title: '未报价说明',
      dataIndex: 'cause',
      align: 'center',
      render: (text, record, index) => {
        return (
          <>
            <Input className="keydownInp" data-partindex={index+"07"} style={{ width: 80, padding: 4 }} />
          </>
        );
      },
    },
    {
      title: '非现货件标记',
      dataIndex: 'flag',
      align: 'center',
      render: (text, record, index) => {
        return (
          <>
            <Checkbox onChange={onChange}>
              {text}
            </Checkbox>
          </>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      render: (text, record, index) => {
        return (
          <>
            <Input className="keydownInp" placeholder="备注" data-partindex={index+"08"} /><br />
            <a onClick={() => remarkImg(record)}>备注照片</a>
          </>
        );
      },
    },
  ];
}
export {columns};