import { Avatar, Card, Col, DatePicker, Skeleton, Row, Statistic, Carousel, Tabs, Rate } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';
import Announcement from './components/announcement';
import WorkChart1 from './components/workChart1';
import WorkChart2 from './components/workChart2';
import WorkChart3 from './components/workChart3';
import WorkChart4 from './components/workChart4';
import WorkChart5 from './components/workChart5';
import IntroduceRow from './components/IntroduceRow';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const carouselUrl = [
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
];

const PageHeaderContent = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          杭州神辇网络科技有限公司
        </div>
        <div>
          欢迎登录驾安配供应商系统
        </div>
      </div>
    </div>
  );
};

const ExtraContent = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="今日结算金额" value={56} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="麦保付账户余额" value={8} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="上传的配件数量" value={2223} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="上传清洗通过的配件数量" value={2223} />
    </div>
  </div>
);

class DashboardWorkplace extends Component {
  constructor(props) {  //构造函数，用来初始化state
    super(props);  //定义其子类的构造函数时，都需要调用 super 方法,构造函数必须以 super(props) 开头。
    this.state = {
      rangePickerValue: getTimeDistance('year'),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardWorkplace/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardWorkplace/clear',
    });
  }


  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });
    dispatch({
      type: 'dashboardAnalysis/fetchSalesData',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });
    dispatch({
      type: 'dashboardWorkplace/fetchSalesData',
    });
  };

  render() {
    const { rangePickerValue } = this.state;
    const { currentUser, projectNotice, projectLoading,} = this.props;

    if (!currentUser || !currentUser.userid) {
      return null;
    }

    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent />}
      >
        <Row gutter={24}>
          <Announcement />
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="待办事项"
              bordered={false}
              extra={<Link to="/">查看更多</Link>}
              loading={projectLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              {projectNotice.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                    }}
                    bordered={false}
                  >
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <span title={item.title}>{item.title}</span>
                        </div>
                      }
                      description={item.number}
                    />
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card>
              <Tabs
                tabBarExtraContent={
                  <div>
                    <div className={styles.salesDate}>
                      <a onClick={this.selectDate.bind(this, 'today')} style={{marginRight:'20px'}}>今日</a>
                      <a onClick={this.selectDate.bind(this, 'week')} style={{marginRight:'20px'}}>本周</a>
                      <a onClick={this.selectDate.bind(this, 'month')} style={{marginRight:'20px'}}>本月</a>
                      <a onClick={this.selectDate.bind(this, 'year')} style={{marginRight:'20px'}}>全年</a>
                    </div>
                    {/* <RangePicker
                      value={rangePickerValue}
                      onChange={this.handleRangePickerChange}
                      style={{
                        width: 256,
                      }}
                    /> */}
                  </div>
                }
                size="large"
                tabBarStyle={{
                  marginBottom: 24,
                }}
                defaultActiveKey="1"
              >
                <TabPane tab="询价单量" key="1">
                  <h4 style={{marginBottom: '20px'}}>询价单量</h4>
                  <WorkChart1 />
                </TabPane>
                <TabPane tab="报价单量" key="2">
                  <h4 style={{marginBottom: '20px'}}>报价单量</h4>
                  <WorkChart2 />
                </TabPane>
                <TabPane tab="确认报价单量" key="3">
                <h4 style={{marginBottom: '20px'}}>确认报价单量</h4>
                  <WorkChart3 />
                </TabPane>
                <TabPane tab="成交单量" key="4">
                <h4 style={{marginBottom: '20px'}}>成交单量</h4>
                  <WorkChart4 />
                </TabPane>
                <TabPane tab="成交金额" key="5">
                <h4 style={{marginBottom: '20px'}}>成交金额</h4>
                  <WorkChart5 />
                </TabPane>
              </Tabs>
            </Card>
            <IntroduceRow />
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Carousel autoplay className={styles.marginBottom24}>
              {carouselUrl.map((item) => (
                <div>
                  <img
                    key={item.key}
                    style={{ width: '100%',height: '300px',cursor: 'pointer'}}
                    alt="example"
                    src={item.url}
                  />
                </div>
              ))}
            </Carousel>
            <Card className={styles.marginBottom24}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="乘用车评分" key="1">
                  <div>
                    供应商评分（乘用车）
                    <div className={styles.marginTop10}>
                      <Rate 
                        defaultValue={4}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className={styles.marginTop24 + " " + styles.positionRelative}>
                    乘用车报价超时次数<span className={styles.number}>3</span>
                  </div>
                  <div className={styles.marginTop24 + " " + styles.positionRelative}>
                    乘用车发货超时次数<span className={styles.number}>2</span>
                  </div>
                  <div className={styles.marginTop24 + " " + styles.marginBottom24 + " " + styles.positionRelative}>
                    供应商月积分的排名<span className={styles.number + " " + styles.numberBg}>1</span>
                  </div>
                </TabPane>
                <TabPane tab="商用车评分" key="2">
                  <div>
                    供应商评分（乘用车）
                    <div className={styles.marginTop10}>
                      <Rate 
                        defaultValue={4}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className={styles.marginTop24 + " " + styles.positionRelative}>
                    乘用车报价超时次数<span className={styles.number}>3</span>
                  </div>
                  <div className={styles.marginTop24 + " " + styles.positionRelative}>
                    乘用车发货超时次数<span className={styles.number}>2</span>
                  </div>
                  <div className={styles.marginTop24 + " " + styles.marginBottom24 + " " + styles.positionRelative}>
                    供应商月积分的排名<span className={styles.number + " " + styles.numberBg}>1</span>
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({ dashboardWorkplace: { currentUser, activities, projectNotice }, loading }) => ({
    currentUser,
    activities,
    projectNotice,
    currentUserLoading: loading.effects['dashboardWorkplace/fetchUserCurrent'],
    projectLoading: loading.effects['dashboardWorkplace/fetchProjectNotice'],
  }),
)(DashboardWorkplace);
