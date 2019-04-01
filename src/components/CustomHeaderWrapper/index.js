import React from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { connect } from 'dva';
import GridContent from './GridContent';
import styles from './index.less';
import MenuContext from '@/layouts/MenuContext';
import {Row, Col, Form, Card, Select, Input, Table, Modal, Divider, Transfer,PageHeader} from 'antd';
const PageHeaderWrapper = ({ children, contentWidth, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    <PageHeader
      style={{ margin: '-24px -24px 0' }}
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
    />
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))(PageHeaderWrapper);
