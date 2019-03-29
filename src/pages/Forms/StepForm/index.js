import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../style.less';

const { Step } = Steps;

export default class StepForm extends PureComponent {

  render() {
    const { location, children } = this.props;
    return (
      <PageHeaderWrapper
        title="设备管理"
        tabActiveKey={location.pathname}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}
