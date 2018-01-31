import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Switch, Menu, Dropdown, Icon, Button } from 'antd';
import styles from './index.less';


const statusMap = ['processing', 'success', 'default'];
class CouponTable extends PureComponent {
  // state = {
  //   selectedRowKeys: [],
  //   totalCallNo: 0,
  // };

  // componentWillReceiveProps(nextProps) {
  //   // clean state
  //   if (nextProps.selectedRows.length === 0) {
  //     this.setState({
  //       selectedRowKeys: [],
  //       totalCallNo: 0,
  //     });
  //   }
  // }

  // handleRowSelectChange = (selectedRowKeys, selectedRows) => {
  //   const totalCallNo = selectedRows.reduce((sum, val) => {
  //     return sum + parseFloat(val.callNo, 10);
  //   }, 0);
  //
  //   if (this.props.onSelectRow) {
  //     this.props.onSelectRow(selectedRows);
  //   }
  //
  //   this.setState({ selectedRowKeys, totalCallNo });
  // }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  // cleanSelectedKeys = () => {
  //   this.handleRowSelectChange([], []);
  // }

  handleSwitchChange = (record, checked) => {
    console.log('========');

    console.log(record);
    console.log(checked);
    this.props.onSwitchChange(record, checked);
  }

  render() {
    // const { selectedRowKeys, totalCallNo } = this.state;
    const { data: { list, pagination }, loading } = this.props;
    const packetStatus = ['代金券红包', '现金红包(即将上线)'];
    const childPacketStatus = ['等额红包', '拼手气红包'];
    const status = ['已发布', '未发布', '已结束'];
    const statusS = [true, false, false];

    const columns = [
      {
        title: '红包号',
        fixed: 'left',
        width: 100,
        dataIndex: 'no',
      },
      {
        title: '名称',
        fixed: 'left',
        width: 100,
        dataIndex: 'description',
      },
      {
        title: '红包类型',
        dataIndex: 'packetType',
        filters: [
          {
            text: packetStatus[0],
            value: 0,
          },
          {
            text: packetStatus[1],
            value: 1,
          },
        ],
      },
      {
        title: '红包子类型',
        dataIndex: 'childPacketType',
        filters: [
          {
            text: childPacketStatus[0],
            value: 0,
          },
          {
            text: childPacketStatus[1],
            value: 1,
          },
        ],
      },
      {
        title: '红包数量',
        dataIndex: 'packetNo',
        align: 'right',
        render: val => `${val}`,
      },
      {
        title: '已领取数量',
        dataIndex: 'getNo',
        align: 'right',
        render: val => `${val}`,
      },
      {
        title: '使用数量',
        dataIndex: 'useNo',
        align: 'right',
        render: val => `${val}`,
      },
      {
        title: '红包金额',
        dataIndex: 'packetMoney',
        align: 'right',
        render: val => `${val}`,
      },
      {
        title: '最低消费金额',
        dataIndex: 'minMoney',
        align: 'right',
        render: val => `${val}`,
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '是否发布',
        fixed: 'right',
        width: 100,
        dataIndex: 'statusS',
        render: (val, record) => (
          <Switch checked={statusS[val]} onChange={checked => this.handleSwitchChange(record, checked)} />
        ),
      },
      {
        title: '操作',
        fixed: 'right',
        width: 130,
        render() {
          const menu = (
            <Menu>
              <Menu.Item key="0" onClick={() => this.alertDe(true)}>
                查看等额红包详情
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="1" onClick={() => this.alertDe(true)}>
                查看拼手气红包详情
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="2" onClick={() => this.alertDe(true)}>
                查看指定品牌红包详情
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3" onClick={() => this.alertDe(true)}>
                查看指定分类红包详情
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="4" onClick={() => this.alertDe(true)}>
                查看指定商品红包详情
              </Menu.Item>
            </Menu>
          );
          const menu2 = (
            <Menu>
              <Menu.Item key="4" onClick={() => this.alertDe(true)}>
                复制
              </Menu.Item>
            </Menu>
          );
          return <Fragment>
            <Dropdown overlay={menu} trigger={['click']}>
              <a href="#">查看</a>
            </Dropdown><br />
            <a href="#">复制</a><br />
            <a href="#">管理负毛利商品</a><br />
            <a href="#">查看领取结果</a><br />
            <a href="#">查看日志</a><br />
            <a href="#">复制链接</a>
          </Fragment>
        },
      },
      // {
      //   title: '操作',
      //   render: () => (
      //     <Fragment>
      //       <a href="">配置</a>
      //       <Divider type="vertical" />
      //       <a href="">订阅警报</a>
      //     </Fragment>
      //   ),
      // },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.handleRowSelectChange,
    //   getCheckboxProps: record => ({
    //     disabled: record.disabled,
    //   }),
    // };

    return (
      <div className={styles.couponTable}>
        <div className={styles.tableAlert} />
        <Table
          scroll={{ x: 1600 }}
          loading={loading}
          rowKey={record => record.key}
          // rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default CouponTable;
