import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

export function UserPortalHeader() {
  const navigate = useNavigate()

  return (
    <header className="user-header">
      <Link to="/home" className="brand-lockup" aria-label="Về trang chủ">
        <span className="brand-emblem" aria-hidden="true">★</span>
        <span>
          <small>ĐƠN VỊ · P0 UI PROTOTYPE</small>
          <strong>HỆ THỐNG GIÁO DỤC CHÍNH TRỊ</strong>
        </span>
      </Link>
      <nav className="header-actions" aria-label="Điều hướng tài khoản demo">
        <Link to="/admin">Admin demo</Link>
        <Button onClick={() => navigate('/login')}>Đăng xuất</Button>
      </nav>
    </header>
  )
}
