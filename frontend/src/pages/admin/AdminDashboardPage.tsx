import { useState } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'

const metrics = [
  { label: 'Tổng quân số', value: '—', note: 'Data placeholder' },
  { label: 'Điểm thi đua', value: '—', note: 'Pending OI-002' },
  { label: 'Xếp hạng', value: '—', note: 'Pending OI-002/OI-014' },
  { label: 'Nội dung phổ biến', value: '—', note: 'Metric placeholder · OI-013' },
]

export function AdminDashboardPage() {
  const [retryStatus, setRetryStatus] = useState(false)

  return (
    <section className="admin-page" data-screen-id="SCR-ADM-001">
      <div className="page-heading">
        <div>
          <p className="eyebrow">TỔNG QUAN VẬN HÀNH</p>
          <h1>Admin Dashboard</h1>
          <p>Bốn vùng metric theo REP-001..REP-004; không polling hoặc background refresh.</p>
        </div>
        <Link className="button-link button-link--quiet" to="/login">Đăng xuất mock</Link>
      </div>

      <PrototypeNotice>Dashboard dùng placeholder có nhãn; không số mock nào được trình bày như dữ liệu thật.</PrototypeNotice>
      <div className="admin-stats">
        {metrics.map((metric) => (
          <article className="admin-stat" key={metric.label}>
            <span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.note}</small>
          </article>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        <article className="admin-panel">
          <div className="section-heading"><div><p className="eyebrow">THI ĐUA</p><h2>Xu hướng / xếp hạng</h2></div></div>
          <div className="chart-placeholder">Biểu đồ placeholder<br /><small>Không tính formula · OI-002/OI-014</small></div>
        </article>
        <article className="admin-panel">
          <p className="eyebrow">THAO TÁC P0</p>
          <h2>Quản lý nhanh</h2>
          <div className="admin-quick-links">
            <Link to="/admin/question-bank">Mở Ngân hàng câu hỏi <span>→</span></Link>
            <Link to="/admin/handbook">Mở Quản lý Cẩm nang <span>→</span></Link>
          </div>
          <PrototypeNotice tone="warning">Popular-content metric chưa được chọn; pending OI-013.</PrototypeNotice>
          <Button onClick={() => setRetryStatus(true)}>Thử tải lại widget (mock)</Button>
          {retryStatus ? <PrototypeNotice>Đã thử tải lại cục bộ; metric vẫn là placeholder chờ OI-013.</PrototypeNotice> : null}
        </article>
      </div>
    </section>
  )
}
