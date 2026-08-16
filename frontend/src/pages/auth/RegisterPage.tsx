import { Button, Card, Form, Input, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

export function RegisterPage() {
  return (
    <main className="centered-page">
      <Card className="auth-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Typography.Title level={2}>Đăng ký</Typography.Title>

          <Form layout="vertical">
            <Form.Item label="Tên đăng nhập" name="username" required>
              <Input />
            </Form.Item>
            <Form.Item label="Mật khẩu" name="password" required>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Mã giới thiệu" name="invitationCode" required>
              <Input />
            </Form.Item>
            <Button type="primary" block disabled>
              Tạo tài khoản
            </Button>
          </Form>

          <Typography.Text type="secondary">
            Skeleton UI — nghiệp vụ đăng ký sẽ được triển khai theo USR-002/USR-003.
          </Typography.Text>
          <Link to="/login">Quay lại đăng nhập</Link>
        </Space>
      </Card>
    </main>
  )
}
