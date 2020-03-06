import React, { Component } from 'react';
import { Col, Card, Row, Tooltip } from 'antd';
import LinesEllipsis from 'react-lines-ellipsis'
import styles from './../style.less';

const text = <span>公告公告公告公告公告公告公告公告公告公告公告公告</span>;

class Announcement extends Component {
  render() {
    return (
      <div className={styles.announcementStyle}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24} className={styles.announcementCol}>
          <Col xl={3} lg={3} md={3} sm={3} xs={3} className={styles.announcement}><i>公告</i></Col>
          <Col xl={1} lg={1} md={1} sm={1} xs={1} className={styles.announcementSort}><i>1</i></Col>
          <Col xl={5} lg={5} md={5} sm={5} xs={5}>
            <Tooltip title={text}>
              <LinesEllipsis
                text='公告公告公告公告公告公告公告公告公告公告公告公告'
                maxLine='1'
                ellipsis='...'
                trimRight
                basedOn='letters'
                tooltip
              />
            </Tooltip>
          </Col>
          <Col xl={1} lg={1} md={1} sm={1} xs={1} className={styles.announcementSort}><i>2</i></Col>
          <Col xl={5} lg={5} md={5} sm={5} xs={5}>
            <Tooltip title={text}>
              <LinesEllipsis
                text='公告公告公告公告公告公告公告公告公告公告公告公告'
                maxLine='1'
                ellipsis='...'
                trimRight
                basedOn='letters'
                tooltip
              />
            </Tooltip>
          </Col>
          <Col xl={1} lg={1} md={1} sm={1} xs={1} className={styles.announcementSort}><i>3</i></Col>
          <Col xl={5} lg={5} md={5} sm={5} xs={5}>
            <Tooltip title={text}>
              <LinesEllipsis
                text='公告公告公告公告公告公告公告公告公告公告公告公告'
                maxLine='1'
                ellipsis='...'
                trimRight
                basedOn='letters'
                tooltip
              />
            </Tooltip>
          </Col>
          <Col xl={3} lg={3} md={3} sm={3} xs={3} className={styles.announcementMore}><a>更多></a></Col>
        </Col>
      </div>
    )
  }
}

export default Announcement;