import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Modal, message } from 'antd';
import CouponTable from '../../components/CouponTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { getToken } from '../../utils/GlobalContent';

import styles from './discount.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const CreateForm = Form.create()((props) => {
  const { modalVisible, addInputValue, parent, form } = props;
  const okHandle = () => {
    form.validateFields((err/* , fieldsValue */) => {
      if (err) return;
      parent.handleAdd();
    });
  };
  return (
    <Modal
      title="创建红包"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => parent.handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="描述"
      >
        {form.getFieldDecorator('description', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input placeholder="请输入" onChange={parent.handleAddInput} />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    expandForm: false,
    // selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  onSwitchChange = (record, checked) => {
    this.props.dispatch({
      type: 'rule/pub',
      payload: { record, checked },
    });
  }

  //-----------------------
  // handleTest = () => {
  //   const token = getToken();
  //   console.log(token.token);
  // };

  //------------------------

  handleCouponTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  }


  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    // const { selectedRows } = this.state;
    //
    // if (!selectedRows) return;

    // switch (e.key) {
    //   case 'remove':
    //     dispatch({
    //       type: 'rule/remove',
    //       payload: {
    //         no: selectedRows.map(row => row.no).join(','),
    //       },
    //       callback: () => {
    //         this.setState({
    //           selectedRows: [],
    //         });
    //       },
    //     });
    //     break;
    //   default:
    //     break;
    // }
  }

  // handleSelectRows = (rows) => {
  //   this.setState({
  //     selectedRows: rows,
  //   });
  // }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: this.state.addInputValue,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }


  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={14} sm={24}>
            <Button type="primary" onClick={() => this.handleModalVisible(true)}>创建红包</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.alertManageProducts}>管理负毛利商品</Button>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={2} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">搜索</Button>
              {/* <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const { rule: { data }, loading } = this.props;
    const { modalVisible, addInputValue } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleAddInput: this.handleAddInput,
    };

    return (
      <PageHeaderLayout title="红包管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>

            <CouponTable
              // loading={loading}
              data={data}
              onChange={this.handleCouponTableChange}
              onSwitchChange={this.onSwitchChange}
            />
          </div>
        </Card>
        <CreateForm
          parent={parentMethods}
          modalVisible={modalVisible}
          addInputValue={addInputValue}
        />
      </PageHeaderLayout>
    );
  }
}
