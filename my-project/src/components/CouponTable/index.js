import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Switch } from 'antd';
import styles from './index.less';


const statusMap = [ 'success', 'processing', 'default'];
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
    this.props.onSwitchChange(record, checked);
  }

  render() {
    // const { selectedRowKeys, totalCallNo } = this.state;
    const { data: { list, pagination }, loading } = this.props;
    const packetStatus = ['代金券紅包', '現金紅包(即將上綫)'];
    const childPacketStatus = ['等额红包', '拼手气红包'];
    const status = ['已发布', '未发布', '已结束'];
    const statusS = [true, false];

    const columns = [
      {
        title: '红包号',
        dataIndex: 'no',
      },
      {
        title: '名称',
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
        dataIndex: 'statusS',
        render: (val, record) => (
          <Switch checked={statusS[val]} onChange={checked => this.handleSwitchChange(record, checked)} />
        ),
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="">配置</a>
            <Divider type="vertical" />
            <a href="">订阅警报</a>
          </Fragment>
        ),
      },
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
        <div className={styles.tableAlert}>

        </div>
        <Table
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
