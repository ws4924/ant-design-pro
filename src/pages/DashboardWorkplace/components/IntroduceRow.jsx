import React, { Component } from 'react';
import { ChartCard, MiniArea, MiniProgress } from './Charts';
import { Col} from 'antd';
import moment from 'moment';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

class IntroduceRows extends Component {
  render() {
    return (
      <div style={{marginTop: '20px'}}>
        <Col span={12} style={{paddingLeft: '0'}}>
          <ChartCard
          title="报价满足率"
          // action={
          //   <Tooltip title="指标说明">
          //     <Icon type="info-circle-o" />
          //   </Tooltip>
          // }
          total="78%"
          // footer={
          //   <div>
          //     <span>
          //       周同比
          //       <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
          //         12%
          //       </Trend>
          //     </span>
          //     <span style={{ marginLeft: 16 }}>
          //       日环比
          //       <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
          //         11%
          //       </Trend>
          //     </span>
          //   </div>
          // }
          contentHeight={46}
        >
          <MiniProgress percent={78} strokeWidth={8} target={80} />
        </ChartCard>
        </Col>
        <Col span={12} style={{paddingRight: '0'}}>
          <ChartCard 
            title="报价时效" 
            // total={numeral(8846).format('0,0')} 
            contentHeight={46}
          >
            {/* <NumberInfo
              subTitle={<span>本周访问</span>}
              total={numeral(12321).format('0,0')}
              status="up"
              subTotal={17.1}
            /> */}
            <MiniArea line height={45} data={visitData} />
          </ChartCard>
        </Col>
      </div>
    )
  }
}

export default IntroduceRows;