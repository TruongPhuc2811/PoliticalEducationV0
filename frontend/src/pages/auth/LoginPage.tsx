import { Button, Card, Form, Input, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <main className="centered-page">
      <Card className="auth-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={2} style={{ marginBottom: 4 }}>
              Đăng nhập
            </Typography.Title>
            <Typography.Text type="secondary">
              Hệ thống Giáo dục Chính trị
            </Typography.Text>
          </div>

          <Form
            layout="vertical"
            onFinish={() => navigate('/home')}
          >
            <Form.Item label="Tên đăng nhập" name="username" required>
              <Input autoComplete="username" />
            </Form.Item>
            <Form.Item label="Mật khẩu" name="password" required>
              <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Button htmlType="submit" type="primary" block>
              Đăng nhập
            </Button>
          </Form>

          <Typography.Text>
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </Typography.Text>

          <Typography.Text type="secondary" className="skeleton-note">
            Skeleton UI: chưa kết nối xác thực backend.
          </Typography.Text>
        </Space>
      </Card>
    </main>
  )
}
