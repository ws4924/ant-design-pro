import { Chart, Axis, Tooltip, Geom} from "bizcharts";

const membership = [
  { month: "1月", number: 113},
  { month: "2月", number: 432},
  { month: "3月", number: 234},
  { month: "4月", number: 334},
  { month: "5月", number: 656},
  { month: "6月", number: 989},
  { month: "7月", number: 123},
  { month: "8月", number: 567},
  { month: "9月", number: 986},
  { month: "10月", number: 456},
  { month: "11月", number: 678},
  { month: "12月", number: 234}
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