import { Card, Col, Row, Statistic, Typography } from 'antd'

export function AdminDashboardPage() {
  return (
    <section>
      <Typography.Title level={2}>Admin Dashboard</Typography.Title>
      <Typography.Paragraph type="secondary">
        Skeleton dashboard — số liệu thật sẽ được thiết kế/triển khai theo REP-001..REP-004.
      </Typography.Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Tổng quân số" value={500} suffix="demo" /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Điểm thi đua" value={0} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Xếp hạng" value="—" /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Nội dung phổ biến" value="—" /></Card>
        </Col>
      </Row>
    </section>
  )
}
