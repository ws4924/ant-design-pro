import { Tabs } from 'antd';
import Tab1Pan from './components/tab1';
import Tab2Pan from './components/tab2';
import Tab3Pan from './components/tab3';
import Tab4Pan from './components/tab4';

const { TabPane } = Tabs;
const defaultTab = "1";  //默认选中
const RecoveryQuery = () => {
  return (
    <Tabs animated={false} defaultActiveKey={defaultTab}>
      <TabPane tab="tab1" key="1">
        <Tab1Pan />
      </TabPane>
      <TabPane tab="tab2" key="2">
        <Tab2Pan />
      </TabPane>
      <TabPane tab="tab3" key="3">
        <Tab3Pan />
      </TabPane>
      <TabPane tab="tab4" key="4">
        <Tab4Pan />
      </TabPane>
    </Tabs>
  );
};

export default RecoveryQuery;
