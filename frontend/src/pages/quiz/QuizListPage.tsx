import { useState } from 'react'
import { Button, Modal } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'
import { UserPortalHeader } from '../../shared/components/UserPortalHeader'
import { quizSummaries, type QuizSummary } from '../../shared/mocks/p0PrototypeData'

type DemoState = 'default' | 'loading' | 'empty' | 'error'

export function QuizListPage() {
  const navigate = useNavigate()
  const [selectedQuiz, setSelectedQuiz] = useState<QuizSummary | null>(null)
  const [demoState, setDemoState] = useState<DemoState>('default')

  return (
    <div className="portal-page" data-screen-id="SCR-QUIZ-001">
      <UserPortalHeader />
      <main className="page-container content-page">
        <div className="page-heading">
          <div>
            <p className="breadcrumb"><Link to="/home">Trang chủ</Link> / Kiểm tra trắc nghiệm</p>
            <p className="eyebrow">KIỂM TRA TRẮC NGHIỆM</p>
            <h1>Danh sách kỳ kiểm tra</h1>
            <p>Chọn một kỳ đang mở để xem flow P0.</p>
          </div>
          <Link className="button-link button-link--quiet" to="/home">Về trang chủ</Link>
        </div>

        <PrototypeNotice tone="warning">
          Không hiển thị số lần làm. Attempt/resume chờ OI-007; timeout chờ OI-008.
        </PrototypeNotice>
        <div className="prototype-state-control">
          <span>Trạng thái dữ liệu demo:</span>
          <select value={demoState} onChange={(event) => setDemoState(event.target.value as DemoState)}>
            <option value="default">Mặc định</option>
            <option value="loading">Loading</option>
            <option value="empty">Empty</option>
            <option value="error">Error</option>
          </select>
        </div>

        {demoState === 'loading' ? <div className="state-panel" role="status">Đang tải kỳ kiểm tra…</div> : null}
        {demoState === 'empty' ? <div className="state-panel" role="status"><strong>Chưa có kỳ kiểm tra.</strong></div> : null}
        {demoState === 'error' ? <PrototypeNotice tone="error">Không tải được danh sách mock. Chọn “Mặc định” để thử lại.</PrototypeNotice> : null}

        {demoState === 'default' ? (
          <section className="quiz-list-grid" aria-label="Các kỳ kiểm tra">
            {quizSummaries.map((quiz) => (
              <article key={quiz.id} className="quiz-summary-card">
                <span className={`status-pill status-pill--${quiz.status}`}>{quiz.status === 'open' ? 'Đang mở' : 'Đã đóng'}</span>
                <h2>{quiz.title}</h2>
                <dl className="metadata-grid">
                  <div><dt>Số câu</dt><dd>{quiz.questionCount}</dd></div>
                  <div><dt>Thời gian</dt><dd>{quiz.configuredMinutes} phút</dd></div>
                  <div><dt>Điểm đạt</dt><dd>{quiz.passThresholdLabel}</dd></div>
                </dl>
                <Button type={quiz.status === 'open' ? 'primary' : 'default'} disabled={quiz.status === 'closed'} onClick={() => setSelectedQuiz(quiz)}>
                  {quiz.status === 'open' ? 'Bắt đầu' : 'Kỳ đã đóng'}
                </Button>
              </article>
            ))}
          </section>
        ) : null}

        <nav className="pagination-bar" aria-label="Phân trang kỳ kiểm tra">
          <Button disabled>Trước</Button><span>Trang 1 / 1</span><Button disabled>Sau</Button>
        </nav>
      </main>

      <Modal
        title="Xác nhận bắt đầu"
        open={Boolean(selectedQuiz)}
        onCancel={() => setSelectedQuiz(null)}
        footer={[
          <Button key="cancel" onClick={() => setSelectedQuiz(null)}>Hủy</Button>,
          <Button key="start" type="primary" onClick={() => selectedQuiz && navigate(`/quizzes/${selectedQuiz.id}/attempt`)}>Bắt đầu mock</Button>,
        ]}
      >
        <p>Prototype chỉ mở màn hình làm bài; không tạo attempt hoặc random đề.</p>
        <PrototypeNotice>Attempt/fixed-resume chờ OI-007; timeout chờ OI-008.</PrototypeNotice>
      </Modal>
    </div>
  )
}
