import { useState } from 'react'
import { Button, Drawer, Layout, Menu } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'

const { Content } = Layout

const adminItems = [
  { key: '/admin', label: <Link to="/admin">Tổng quan</Link> },
  { key: '/admin/question-bank', label: <Link to="/admin/question-bank">Ngân hàng câu hỏi</Link> },
  { key: '/admin/handbook', label: <Link to="/admin/handbook">Quản lý Cẩm nang</Link> },
  { key: 'p1', label: 'Các phân hệ P1', disabled: true },
]

function AdminNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation()
  return (
    <>
      <Link to="/admin" className="admin-brand" onClick={onNavigate}>
        <span aria-hidden="true">★</span>
        <span><small>P0 PROTOTYPE</small><strong>PES ADMIN</strong></span>
      </Link>
      <Menu mode="inline" selectedKeys={[location.pathname]} items={adminItems} onClick={onNavigate} />
    </>
  )
}

export function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Layout className="admin-shell">
      <aside className="admin-sidebar" aria-label="Điều hướng quản trị P0">
        <AdminNavigation />
      </aside>
      <Layout className="admin-workspace">
        <header className="admin-header">
          <Button className="admin-menu-button" onClick={() => setDrawerOpen(true)} aria-label="Mở menu quản trị">☰ Menu</Button>
          <div>
            <strong>Hệ thống Giáo dục Chính trị</strong>
            <small>Operational portal · local mock only</small>
          </div>
          <Link to="/home">User Portal</Link>
        </header>
        <Content className="admin-content"><Outlet /></Content>
      </Layout>
      <Drawer title="Điều hướng Admin P0" placement="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <AdminNavigation onNavigate={() => setDrawerOpen(false)} />
      </Drawer>
    </Layout>
  )
}
