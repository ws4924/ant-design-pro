import { Chart, Axis, Tooltip, Geom} from "bizcharts";

const membership = [
  { month: "1月", number: 120},
  { month: "2月", number: 130},
  { month: "3月", number: 150},
  { month: "4月", number: 720},
  { month: "5月", number: 920},
  { month: "6月", number: 890},
  { month: "7月", number: 880},
  { month: "8月", number: 820},
  { month: "9月", number: 920},
  { month: "10月", number: 340},
  { month: "11月", number: 260},
  { month: "12月", number: 580}
];

const scale_membership = {
  number: {
    min: 0,
    max: 1000,
  },
};

class workChart1 extends React.Component {
  constructor(props) {  //构造函数，用来初始化state
    super(props);  //定义其子类的构造函数时，都需要调用 super 方法,构造函数必须以 super(props) 开头。
    this.state = {
      loading: false,
      toggle: false,
      visible: false, // 是否隐藏/显示新增弹窗
    };
  }

  render() {
    return (
      <Chart height={300}
        data={membership}
        scale={scale_membership}
        forceFit>
        <Axis title
          textStyle={{
            fill: '#404040', // 文本的颜色
            fontSize: '12', // 文本大小
            fontWeight: 'bold', // 文本粗细                     
          }}
        />
        <Tooltip
          showTitle={false}
          crosshairs={{
            type: "y"
          }}
        />
        <Geom
          type="interval"
          position="month*number"
          color={['number', (number) => {
            if (number > 300)
              return '#1890ff';
            else
              return '#ff0000';
          }
          ]} >
        </Geom>
      </Chart>
    )
  }
}

export default workChart1;