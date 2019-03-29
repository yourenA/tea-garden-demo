import React, {PureComponent} from 'react';
import moment from 'moment';
import {connect} from 'dva';
import {Row, Col, Form, Card, Select, Input, Table, Modal, Divider, Transfer} from 'antd';
import {Collapse, Button} from 'antd';

const Panel = Collapse.Panel;
import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './Projects.less';
const {Option} = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */

@connect(({list, loading}) => ({
  list,
  loading: loading.models.list,
}))
class CoverCardList extends PureComponent {
  constructor(props) {
    super(props);
    this.echarts = window.echarts;
    this.myChart = null;
    this.state = {
      showVisible: false,
      targetKeys: [],
      selectedKeys: [],
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
    this.renderChart(null, '.chart')
    this.renderChart(null, '.chart2')
    this.renderChart(null, '.chart3')
    this.renderChart(null, '.chart4')
    window.addEventListener('resize', this.resizeChart)
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({targetKeys: nextTargetKeys});

    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  resizeChart = ()=> {
    if (this.myChart) {
      this.myChart.resize();
    }
  }
  renderChart = (data, className)=> {
    this.myChart = this.echarts.init(document.querySelector(className));
    let option = {
      backgroundColor: '#eee',
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['电压', '电流']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        top: '5%',
        left: '1%',
        right: '5%',
        bottom: '1%',
        containLabel: true
      },
      series: [
        {
          name: '电压',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '电流',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
      ]
    };
    const that = this;
    that.myChart.setOption(option);

  }
  showVisible = (showVisible)=> {
    this.setState({
      showVisible
    })
  }
  showVisible2 = (showVisible2)=> {
    this.setState({
      showVisible2
    })
  }
  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 10; i++) {
      const data = {
        key: i.toString(),
        title: `前端压力${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({mockData, targetKeys});
  }

  render() {

    const data = [{
      key: '1',
      name: '3/12 12:45:23',
      age: 32,
      address: '1.25'
    }, {
      key: '2',
      name: '3/12 12:45:23',
      age: 42,
      address: '1.25'
    }, {
      key: '3',
      name: '3/12 12:45:23',
      age: 42,
      address: '1.25'
    }, {
      key: '4',
      name: '3/12 12:45:23',
      age: 42,
      address: '1.45'
    }];
    const columns = [{
      title: '时间',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '电压值',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '电流值',
      dataIndex: 'address',
      key: 'address',
    }];
    const setDate = [{
      name: '标准值',
      age: '',
    }, {
      name: '偏差',
      age: '',
    }];
    const setColumns = [{
      title: '设定值',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '值',
      dataIndex: 'age',
      key: 'age',
    }];
    const showDate = [{
      index: 1,
      name: '发电机输出电压、电流',
      age: '设备编号1',
    }, {
      index: 2,
      name: '前后端压力',
      age: '设备编号2',
    }, {
      index: 3,
      name: '发电机转速、功率',
      age: '设备编号3',
    }, {
      index: 4,
      name: '流量曲线',
      age: '设备编号4',
    },];
    const editDate = [{
      index: 'CS01',
      name: '多功能减压阀球阀1，2动作设置',
      age: '设备编号1',
    }, {
      index: 'CS02',
      name: '',
      age: '',
    }];
    const showColumns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '显示名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '设备编号',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '操作',
      dataIndex: 'oprate',
      key: 'oprate',
      render: (val, record, index) => (
        <div>
          <a href="javascript:;" onClick={()=> {
            this.setState(
              {
                editRecord: record,
                addEditVisible: true
              }
            )
          }}>修改</a>
          <Divider type="vertical"/>
          <a href="javascript:;" onClick={()=> {
          }}>删除</a>
        </div>
      ),

    }];
    const editColumns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '显示名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '设备编号',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '操作',
      dataIndex: 'oprate',
      key: 'oprate',
      render: (val, record, index) => (
        <div>
          <a href="javascript:;" onClick={()=> {
            this.setState(
              {
                editRecord: record,
                setVisible: true
              }
            )
          }}>修改</a>
          <Divider type="vertical"/>
          <a href="javascript:;" onClick={()=> {
          }}>删除</a>
        </div>
      ),

    }];
    const mockData = [{
      key: 1,
      title: `前端压力`,
    }, {
      key: 2,
      title: `后端压力`,
    }, {
      key: 3,
      title: `流量`,
    }, {
      key: 4,
      title: `发电电压`,
    }, {
      key: 5,
      title: `发电电流`,
    }, {
      key: 6,
      title: `发电效率`,
    }];

    const {targetKeys, selectedKeys, disabled} = this.state;
    return (
      <div>

        <Card bordered={false}>
          <Collapse activeKey={['1', '2']}>
            <Panel showArrow={false} header="设备数据采集" key="1"
                   extra={ <Button size="small" type="primary" icon='setting' onClick={()=> {
                     this.showVisible(true)
                   }
                   }>维护</Button>}>
              <div><Row gutter={12}>
                <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{marginBottom: 12}}>
                  <Card
                    hoverable={true}
                    size="small"
                    headStyle={{
                      paddingLeft: '5px',
                    }}
                    bodyStyle={{
                      padding: '0',
                      minHeight: '170px'
                    }}
                    title={
                      "发电机输出电压、电流"
                    }
                  >
                    <Row type="flex">
                      <Col xs={8}>
                        <Table size="small" columns={columns} dataSource={data} bordered={true} pagination={false}/>
                      </Col>
                      <Col xs={16}>

                        <div style={{width: '100%', height: '100%'}} className="chart"></div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{marginBottom: 12}}>
                  <Card
                    hoverable={true}
                    size="small"
                    headStyle={{
                      paddingLeft: '5px',
                    }}
                    bodyStyle={{
                      padding: '0',
                      minHeight: '170px'
                    }}
                    title={
                      "前后端压力"
                    }
                  >
                    <Row type="flex">
                      <Col xs={8}>
                        <Table size="small" columns={columns} dataSource={data} bordered={true} pagination={false}/>
                      </Col>
                      <Col xs={16}>

                        <div style={{width: '100%', height: '100%'}} className="chart2"></div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{marginBottom: 12}}>
                  <Card
                    hoverable={true}
                    size="small"
                    headStyle={{
                      paddingLeft: '5px',
                    }}
                    bodyStyle={{
                      padding: '0',
                      minHeight: '170px'
                    }}
                    title={
                      "发电机转速、功率"
                    }
                  >
                    <Row type="flex">
                      <Col xs={8}>
                        <Table size="small" columns={columns} dataSource={data} bordered={true} pagination={false}/>
                      </Col>
                      <Col xs={16}>

                        <div style={{width: '100%', height: '100%'}} className="chart3"></div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{marginBottom: 12}}>
                  <Card
                    hoverable={true}
                    size="small"
                    headStyle={{
                      paddingLeft: '5px',
                    }}
                    bodyStyle={{
                      padding: '0',
                      minHeight: '170px'
                    }}
                    title={
                      "流量曲线"
                    }
                  >
                    <Row type="flex">
                      <Col xs={8}>
                        <Table size="small" columns={columns} dataSource={data} bordered={true} pagination={false}/>
                      </Col>
                      <Col xs={16}>

                        <div style={{width: '100%', height: '100%'}} className="chart4"></div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row></div>
            </Panel>
            <Panel showArrow={false} header="设备参数设置" key="2"
                   extra={ <Button size="small" type="primary" icon='setting' onClick={()=> {
                     this.showVisible2(true)
                   }
                   }>维护</Button>}>
              <div>
                <Row gutter={12}>
                  <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{marginBottom: 12}}>
                    <Card
                      hoverable={true}
                      size="small"
                      headStyle={{
                        paddingLeft: '5px',
                      }}
                      bodyStyle={{
                        padding: '0',
                      }}
                      title={
                        "球阀操作"
                      }
                    >
                      <Table size="small" columns={setColumns} dataSource={setDate} bordered={true} pagination={false}/>
                    </Card>
                    <div style={{textAlign: 'center', marginTop: '12px'}}>
                      <Button size="small" type="primary" icon='setting'>操作一</Button>
                      <Button size="small" type="primary" icon='setting' style={{marginLeft: '6px'}}>操作二</Button>
                    </div>
                  </Col>
                  <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{marginBottom: 12}}>
                    <Card
                      hoverable={true}
                      size="small"
                      headStyle={{
                        paddingLeft: '5px',
                      }}
                      bodyStyle={{
                        padding: '0',
                      }}
                      title={
                        "前后压力设置"
                      }
                    >
                      <Table size="small" columns={setColumns} dataSource={setDate} bordered={true} pagination={false}/>
                    </Card>
                    <div style={{textAlign: 'center', marginTop: '12px'}}>
                      <Button size="small" type="primary" icon='setting'>操作一</Button>
                    </div>
                  </Col>
                  <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{marginBottom: 12}}>
                    <Card
                      hoverable={true}
                      size="small"
                      headStyle={{
                        paddingLeft: '5px',
                      }}
                      bodyStyle={{
                        padding: '0',
                      }}
                      title={
                        "流量设置"
                      }
                    >
                      <Table size="small" columns={setColumns} dataSource={setDate} bordered={true} pagination={false}/>
                    </Card>
                    <div style={{textAlign: 'center', marginTop: '12px'}}>
                      <Button size="small" type="primary" icon='setting'>操作一</Button>
                    </div>
                  </Col>
                  <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{marginBottom: 12}}>
                    <Card
                      hoverable={true}
                      size="small"
                      headStyle={{
                        paddingLeft: '5px',
                      }}
                      bodyStyle={{
                        padding: '0',
                      }}
                      title={
                        "压力设置"
                      }
                    >
                      <Table size="small" columns={setColumns} dataSource={setDate} bordered={true} pagination={false}/>
                    </Card>
                    <div style={{textAlign: 'center', marginTop: '12px'}}>
                      <Button size="small" type="primary" icon='setting'>操作一</Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Panel>
          </Collapse>

        </Card>
        <Modal
          title="参数显示维护"
          centered
          width="700px"
          visible={this.state.showVisible}
          onOk={() => this.showVisible(false)}
          onCancel={() => this.showVisible(false)}
        >
          <Button type="primary" icon='plus' onClick={()=> {
            this.setState({
              addEditVisible: true
            })
          }}>添加</Button>
          <Table size="small" columns={showColumns} dataSource={showDate} bordered={true} pagination={false}/>
        </Modal>
        <Modal
          title={this.state.editRecord && this.state.editRecord.name}
          centered
          width="700px"
          visible={this.state.addEditVisible}
          onOk={() => this.setState({
            addEditVisible: false
          })}
          onCancel={() => this.setState({
            addEditVisible: false
          })}
        >
          <Transfer
            dataSource={mockData}
            titles={['全部', '显示项']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={this.handleChange}
            onSelectChange={this.handleSelectChange}

            render={item => item.title}
          />
        </Modal>
        <Modal
          title="参数设置维护"
          centered
          width="700px"
          visible={this.state.showVisible2}
          onOk={() => this.showVisible2(false)}
          onCancel={() => this.showVisible2(false)}
        >
          <Button type="primary" icon='plus' onClick={()=> {
            this.setState({
              setVisible: true
            })
          }}>添加</Button>
          <Table size="small" columns={editColumns} dataSource={editDate} bordered={true} pagination={false}/>
        </Modal>
        <Modal
          title="参数设置"
          centered
          width="700px"
          visible={this.state.setVisible}
          onOk={() => this.setState({
            setVisible: false
          })}
          onCancel={() => this.setState({
            setVisible: false
          })}
        >
          <Row type="flex" justify="center" style={{marginBottom: '12px'}}>
            <Col span={4}>参数</Col>
            <Col span={12}>设定值</Col>
            <Col span={4}>执行机构</Col>
            <Col span={4}>执行</Col>
          </Row>
          <Row type="flex" justify="center" style={{marginBottom: '12px'}}>
            <Col span={4}>后端压力 : </Col>
            <Col span={12}>
              上偏差 &nbsp;
              <Select defaultValue="jack">
                <Option value="jack">大于</Option>
                <Option value="lucy">小于</Option>
              </Select>
              &nbsp;
              <Input style={{width: '100px'}}/>
            </Col>
            <Col span={4}>球阀1</Col>
            <Col span={4}><Button type='primary'>开</Button></Col>
          </Row>
          <Row type="flex" justify="center" style={{marginBottom: '12px'}}>
            <Col span={4}>后端压力 : </Col>
            <Col span={12}>
              下偏差 &nbsp;
              <Select defaultValue="lucy">
                <Option value="jack">大于</Option>
                <Option value="lucy">小于</Option>
              </Select>
              &nbsp;
              <Input style={{width: '100px'}}/>
            </Col>
            <Col span={4}>球阀2</Col>
            <Col span={4}><Button type='primary'>开</Button></Col>
          </Row>

        </Modal>
      </div>
    );
  }
}

export default CoverCardList;
