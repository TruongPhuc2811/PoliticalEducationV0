import { Layout, Menu, Typography } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export function AdminLayout() {
  const location = useLocation()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="admin-brand">PES ADMIN</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            { key: '/admin', label: <Link to="/admin">Dashboard</Link> },
            {
              key: '/admin/question-bank',
              label: <Link to="/admin/question-bank">Ngân hàng câu hỏi</Link>,
            },
            {
              key: '/admin/handbook',
              label: <Link to="/admin/handbook">Quản lý Cẩm nang</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <Typography.Text strong>Hệ thống Giáo dục Chính trị</Typography.Text>
          <Link to="/home">User Portal</Link>
        </Header>
        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
