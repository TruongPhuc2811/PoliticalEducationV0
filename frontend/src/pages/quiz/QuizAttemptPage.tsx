import { useState } from 'react'
import { Button, Modal, Radio } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'
import { UserPortalHeader } from '../../shared/components/UserPortalHeader'
import { prototypeQuestions } from '../../shared/mocks/p0PrototypeData'

export function QuizAttemptPage() {
  const navigate = useNavigate()
  const { quizId = 'nhan-thuc-mau' } = useParams()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const question = prototypeQuestions[currentIndex]

  const moveTo = (index: number) => {
    setCurrentIndex(Math.min(Math.max(index, 0), prototypeQuestions.length - 1))
  }

  return (
    <div className="portal-page" data-screen-id="SCR-QUIZ-003">
      <UserPortalHeader />
      <main className="page-container content-page">
        <div className="page-heading">
          <div>
            <p className="breadcrumb"><Link to="/home">Trang chủ</Link> / <Link to="/quizzes">Kỳ kiểm tra</Link> / Làm bài</p>
            <p className="eyebrow">QUIZ MOCK · {quizId}</p>
            <h1>Làm bài kiểm tra</h1>
          </div>
          <Link className="button-link button-link--quiet" to="/quizzes">Quay lại danh sách</Link>
        </div>

        <section className="quiz-attempt-layout">
          <div className="question-panel">
            <div className="quiz-progress-row">
              <strong>Câu {currentIndex + 1} / {prototypeQuestions.length}</strong>
              <span className="timer-display">Thời gian cấu hình: 20:00</span>
            </div>
            <PrototypeNotice tone="warning">Timer hiển thị tĩnh. Không countdown hoặc auto-submit; behavior hết giờ chờ OI-008.</PrototypeNotice>

            <fieldset className="question-fieldset">
              <legend>{question.prompt}</legend>
              <Radio.Group
                value={answers[question.id]}
                onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value as string }))}
                className="answer-list"
              >
                {question.choices.map((choice, index) => (
                  <Radio key={choice} value={choice} className="answer-option">
                    <span>{String.fromCharCode(65 + index)}. {choice}</span>
                  </Radio>
                ))}
              </Radio.Group>
            </fieldset>

            <p className="answer-state" role="status">
              {answers[question.id] ? 'Đã chọn đáp án cho câu đang hiển thị.' : 'Chưa chọn đáp án. Submit-unanswered policy chờ OI-007.'}
            </p>
            <div className="quiz-actions">
              <Button disabled={currentIndex === 0} onClick={() => moveTo(currentIndex - 1)}>Câu trước</Button>
              <Button disabled={currentIndex === prototypeQuestions.length - 1} onClick={() => moveTo(currentIndex + 1)}>Câu sau</Button>
              <Button type="primary" onClick={() => setConfirmOpen(true)}>Nộp bài</Button>
            </div>
          </div>

          <aside className="question-navigator">
            <h2>Danh sách câu</h2>
            <div className="question-buttons">
              {prototypeQuestions.map((item, index) => (
                <Button
                  key={item.id}
                  type={index === currentIndex ? 'primary' : 'default'}
                  className={answers[item.id] ? 'question-button--answered' : ''}
                  aria-label={`Câu ${index + 1}${answers[item.id] ? ' — đã trả lời' : ' — chưa trả lời'}`}
                  onClick={() => moveTo(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
            <PrototypeNotice>Không random/preload question bank. Fixed/resume và attempt count chờ OI-007.</PrototypeNotice>
          </aside>
        </section>
      </main>

      <Modal
        title="Xác nhận nộp bài"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        footer={[
          <Button key="continue" onClick={() => setConfirmOpen(false)}>Tiếp tục làm</Button>,
          <Button key="submit" type="primary" onClick={() => navigate(`/quizzes/${quizId}/result?state=pass`)}>Xác nhận nộp mock</Button>,
        ]}
      >
        <p>Đã trả lời {Object.keys(answers).length}/{prototypeQuestions.length} câu.</p>
        <PrototypeNotice tone="warning">Prototype cho phép đi tiếp để demo; đây không phải quyết định submit-unanswered. OI-007 vẫn mở.</PrototypeNotice>
      </Modal>
    </div>
  )
}
