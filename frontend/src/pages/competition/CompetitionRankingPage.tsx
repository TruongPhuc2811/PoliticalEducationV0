import { useState } from 'react'
import { Button, Table } from 'antd'
import { Link } from 'react-router-dom'
import { PaginationBar } from '../../shared/components/PaginationBar'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'
import { UserPortalHeader } from '../../shared/components/UserPortalHeader'
import { rankingRows } from '../../shared/mocks/p0PrototypeData'

type DemoState = 'default' | 'loading' | 'empty' | 'error'

export function CompetitionRankingPage() {
  const [scope, setScope] = useState('Cá nhân')
  const [period, setPeriod] = useState('Tuần')
  const [demoState, setDemoState] = useState<DemoState>('default')

  return (
    <div className="portal-page" data-screen-id="SCR-COMP-002">
      <UserPortalHeader />
      <main className="page-container content-page">
        <div className="page-heading">
          <div>
            <p className="breadcrumb"><Link to="/home">Trang chủ</Link> / Chấm điểm thi đua</p>
            <p className="eyebrow">CHẤM ĐIỂM THI ĐUA</p>
            <h1>Bảng xếp hạng</h1>
            <p>Xem bố cục xếp hạng theo phạm vi và chu kỳ.</p>
          </div>
          <Link className="button-link button-link--quiet" to="/home">Về trang chủ</Link>
        </div>

        <PrototypeNotice tone="warning" testId="ranking-mock-warning">
          <strong>Mock UI data — business formula pending OI-002/OI-012/OI-014.</strong> Không có trọng số, hệ số hoặc tie-break.
        </PrototypeNotice>

        <section className="ranking-panel">
          <div className="filter-panel filter-panel--spread">
            <label className="form-field">
              <span>Phạm vi</span>
              <select value={scope} onChange={(event) => setScope(event.target.value)}>
                <option>Cá nhân</option><option>Tiểu đội</option><option>Trung đội</option><option>Đại đội</option>
              </select>
            </label>
            <label className="form-field">
              <span>Chu kỳ</span>
              <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                <option>Tuần</option><option>Tháng</option><option>Năm</option>
              </select>
            </label>
            <label className="form-field">
              <span>Trạng thái demo</span>
              <select value={demoState} onChange={(event) => setDemoState(event.target.value as DemoState)}>
                <option value="default">Mặc định</option><option value="loading">Loading</option><option value="empty">Empty</option><option value="error">Error</option>
              </select>
            </label>
          </div>
          <p className="ranking-context" role="status">Đang hiển thị mock: <strong>{scope}</strong> · <strong>{period}</strong></p>

          {demoState === 'loading' ? <div className="state-panel">Đang tải bảng xếp hạng…</div> : null}
          {demoState === 'empty' ? <div className="state-panel"><strong>Chưa có dữ liệu xếp hạng mock.</strong></div> : null}
          {demoState === 'error' ? <PrototypeNotice tone="error">Không tải được bảng mock. Chọn “Mặc định” để thử lại.</PrototypeNotice> : null}
          {demoState === 'default' ? (
            <div className="table-region" role="region" aria-label="Bảng xếp hạng có thể cuộn ngang" tabIndex={0}>
              <Table
                rowKey="rank"
                dataSource={rankingRows}
                pagination={false}
                columns={[
                  { title: 'Hạng', dataIndex: 'rank', width: 80 },
                  { title: 'Đối tượng mẫu', dataIndex: 'subject' },
                  { title: 'Điểm placeholder', dataIndex: 'score' },
                  { title: 'Đơn vị mẫu', dataIndex: 'unit' },
                ]}
              />
            </div>
          ) : null}
          <PaginationBar current={1} total={1} onChange={() => undefined} label="Phân trang bảng xếp hạng" />
          <Button className="visually-secondary-action" disabled>Chi tiết điểm chờ quyết định nghiệp vụ</Button>
        </section>
      </main>
    </div>
  )
}
