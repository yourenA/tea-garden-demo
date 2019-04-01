import React, {Component} from 'react';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';
import sortBy from 'lodash/sortBy';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Select,
} from 'antd';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '@/components/Charts';
import Trend from '@/components/Trend';
import NumberInfo from '@/components/NumberInfo';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Yuan from '@/utils/Yuan';
import {getTimeDistance} from '@/utils/utils';

import styles from './Analysis.less';
import moment from 'moment'
const {Option} = Select;
const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(({chart, loading}) => ({
  chart,
  // loading: loading.effects['chart/fetch'],
}))
class Analysis2 extends Component {
  constructor(props) {
    super(props);
    this.rankingListData = [];
    for (let i = 0; i < 7; i += 1) {
      this.rankingListData.push({
        title: `${7 - i} 号土壤湿度计`,
        total: 323234,
      });
    }
  }

  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    loading: true,
    visitData: [],
    salesData:[],
    offlineData:[],
    offlineChartData:[]
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // this.reqRef = requestAnimationFrame(() => {
    //   dispatch({
    //     type: 'chart/fetch',
    //   });
    //   this.timeoutId = setTimeout(() => {
    //     this.setState({
    //       loading: false,
    //     });
    //   }, 600);
    // });
    this.timeoutId = setTimeout(() => {
      this.setState({
        loading: false,
      });
    })
    const visitData = [];
    const beginDay = new Date().getTime();

    const fakeY = [80, 90, 80, 60, 80, 99, 99, 96, 98, 99, 87, 85, 97];
    for (let i = 0; i < fakeY.length; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay -(1000 * 60 * 60 * 24*fakeY.length) + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: fakeY[i],
      });
    }


    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 100),
      });
    }

    const offlineData = [];
    for (let i = 0; i <= 5; i += 1) {
      offlineData.push({
        name: `${i + 1} 号茶园`,
        cvr: Math.ceil(Math.random() * 9) / 10,
      });
    }
    const offlineChartData = [];
    for (let i = 0; i < 24; i += 1) {
      offlineChartData.push({
        x: new Date('2018-8-8').getTime() + 1000 * 60 * 60 * i,
        y1: Math.floor(Math.random() * 100),
      });
    }

    this.setState({
      visitData,
      salesData,
      offlineData,
      offlineChartData
    })

  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    const {dispatch} = this.props;
    this.setState({
      rangePickerValue,
    });

    // dispatch({
    //   type: 'chart/fetchSalesData',
    // });
  };

  selectDate = type => {
    const {dispatch} = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    // dispatch({
    //   type: 'chart/fetchSalesData',
    // });
  };

  isActive(type) {
    const {rangePickerValue} = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  }

  render() {
    const {rangePickerValue, salesType, loading: propsLoding, currentTabKey,visitData,salesData,offlineData,offlineChartData} = this.state;
    const {chart, loading: stateLoading} = this.props;
    const {
    } = chart;
    const loading = propsLoding || stateLoading;
    let salesPieData;
    const tempData = [];
    for (let i = 0; i < 12; i += 1) {
      tempData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 30),
      });
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );


    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day"/>
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week"/>
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month"/>
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year"/>
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{width: 256}}
        />
        <Select defaultValue="1" style={{width: 120, marginLeft: '12px'}}>
          <Option value="1">一号设备</Option>
          <Option value="2">二号设备</Option>
          <Option value="3">三号设备</Option>
          <Option value="4">四号设备</Option>
          <Option value="5">五号设备</Option>
        </Select>
      </div>
    );


    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    const CustomTab = ({data, currentTabKey: currentKey}) => (
      <Row gutter={8} style={{width: 160, margin: '8px 0'}}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle={'平均上传率'}
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={currentKey !== data.name && 'light'}
          />
        </Col>
        <Col span={12} style={{paddingTop: 36}}>
          <Pie
            animate={false}
            color={currentKey !== data.name && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: {marginBottom: 24},
    };
    let salesDataRankingListData = sortBy(salesData, o => -o.y);
    let tempDataRankingListData = sortBy(salesData, o => -o.y);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
              title={'系统总访问量'}
              action={
                <Tooltip
                  title={
                    <FormattedMessage id="app.analysis.introduce" defaultMessage="introduce"/>
                  }
                >
                  <Icon type="info-circle-o"/>
                </Tooltip>
              }
              total={numeral(8846).format('0,0')}
              footer={
                <Field
                  label={
                    <FormattedMessage id="app.analysis.day-visits" defaultMessage="Day Visits"/>
                  }
                  value={numeral(1234).format('0,0')}
                />
              }
              contentHeight={46}
            >
              <MiniArea color="#13C2C2" data={visitData}/>
            </ChartCard>
          </Col>
         {/* <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
              title={'设备总体合格率'}
              action={
                <Tooltip
                  title={
                    <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                  }
                >
                  <Icon type="info-circle-o"/>
                </Tooltip>
              }
              total={'96.6%'}
              footer={<Field label={'较上个月合格率高'} value="8%"/>}
              contentHeight={46}
            >
              <MiniBar data={visitData}/>
            </ChartCard>
          </Col>*/}

          <Col {...topColResponsiveProps}>
            <ChartCard
              loading={loading}
              bordered={false}
              title={'设备在线/总数'}
              action={
                <Tooltip
                  title={
                    <FormattedMessage id="app.analysis.introduce" defaultMessage="introduce"/>
                  }
                >
                  <Icon type="info-circle-o"/>
                </Tooltip>
              }
              total="74/89"
              footer={
                <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                  日同比 :{' '}
                  <Trend flag="down">
                    在线
                    <span className={styles.trendText}>5</span>
                  </Trend>
                  <Trend flag="up" style={{marginRight: 16}}>
                    总数
                    <span className={styles.trendText}>4</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2"/>
            </ChartCard>
          </Col>
        </Row>

      {/*  <Card loading={loading} bordered={false} bodyStyle={{padding: 0}}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{marginBottom: 24}}>
              <TabPane tab={'设备在线率'} key="sales">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} title={'设备在线率(%)'} data={salesData}/>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab={'设备上传率'} key="views">
                <Row>
                  <Col xl={24} lg={24} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={292} title={'设备上传率(℃)'} data={tempData}/>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>*/}
      </GridContent>
    );
  }
}

export default Analysis2;
