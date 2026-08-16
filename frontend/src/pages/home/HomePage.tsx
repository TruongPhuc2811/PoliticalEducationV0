import { Card, Col, Row, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { moduleDefinitions } from '../../shared/config/moduleDefinitions'

export function HomePage() {
  return (
    <main className="app-shell">
      <header className="user-header">
        <div>
          <Typography.Text className="eyebrow">ĐƠN VỊ</Typography.Text>
          <Typography.Title level={2} style={{ margin: 0 }}>
            HỆ THỐNG GIÁO DỤC CHÍNH TRỊ
          </Typography.Title>
        </div>
        <Link to="/login">Đăng xuất</Link>
      </header>

      <section className="hero-placeholder">
        <Space direction="vertical" size={4}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Trang chủ
          </Typography.Title>
          <Typography.Text>
            Khung xương UI dựa trên định hướng mẫu. Visual cuối cùng sẽ được khóa ở V0.5.
          </Typography.Text>
        </Space>
      </section>

      <section>
        <Row gutter={[16, 16]}>
          {moduleDefinitions.map((module) => (
            <Col xs={24} sm={12} lg={8} key={module.key}>
              <Link to={module.path} className="module-link">
                <Card
                  hoverable
                  className="module-card"
                  data-testid="module-card"
                >
                  <Typography.Title level={4}>{module.title}</Typography.Title>
                  <Typography.Paragraph type="secondary">
                    {module.description}
                  </Typography.Paragraph>
                  <Typography.Text code>{module.requirement}</Typography.Text>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>
    </main>
  )
}
