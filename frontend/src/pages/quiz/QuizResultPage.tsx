import { Button } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'
import { UserPortalHeader } from '../../shared/components/UserPortalHeader'

export function QuizResultPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const result = searchParams.get('state') === 'fail' ? 'fail' : 'pass'
  const resultLabel = result === 'pass' ? 'ĐẠT' : 'KHÔNG ĐẠT'

  return (
    <div className="portal-page" data-screen-id="SCR-QUIZ-004">
      <UserPortalHeader />
      <main className="page-container result-page">
        <section className={`result-card result-card--${result}`} aria-labelledby="result-title">
          <p className="eyebrow">MOCK PRESENTATION STATE</p>
          <h1 id="result-title">Kết quả kiểm tra</h1>
          <div className="result-mark" aria-label={`Kết quả ${resultLabel}`}>{resultLabel}</div>
          <p>Baseline chỉ xác nhận trạng thái Đạt/Không đạt.</p>
          <PrototypeNotice tone="warning">
            Không raw score, percentage, selected attempt hoặc tie-breaker. OI-009 và OI-002 vẫn mở.
          </PrototypeNotice>
          <div className="result-scenario" aria-label="Chọn kịch bản trình diễn">
            <span>Kịch bản mock:</span>
            <Button size="small" type={result === 'pass' ? 'primary' : 'default'} onClick={() => setSearchParams({ state: 'pass' })}>Đạt</Button>
            <Button size="small" type={result === 'fail' ? 'primary' : 'default'} onClick={() => setSearchParams({ state: 'fail' })}>Không đạt</Button>
          </div>
          <div className="result-actions">
            <Link className="button-link" to="/quizzes">Về danh sách kỳ</Link>
            <Link className="button-link button-link--quiet" to="/home">Về trang chủ</Link>
            <Link className="text-action" to="/competition/ranking">Xem thi đua P0 →</Link>
          </div>
        </section>
      </main>
    </div>
  )
}
