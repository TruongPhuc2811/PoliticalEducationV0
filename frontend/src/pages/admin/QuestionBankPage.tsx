import { useMemo, useState } from 'react'
import { Button, Input, Modal, Table } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { PaginationBar } from '../../shared/components/PaginationBar'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'
import { prototypeQuestions, type PrototypeQuestion } from '../../shared/mocks/p0PrototypeData'

const questionSchema = z.object({
  content: z.string().trim().min(1, 'Vui lòng nhập nội dung câu hỏi.'),
  type: z.enum(['Một đáp án đúng', 'Đúng/Sai']),
  topic: z.string().trim().min(1, 'Vui lòng chọn chủ đề.'),
})
type QuestionForm = z.infer<typeof questionSchema>

export function QuestionBankPage() {
  const [questions, setQuestions] = useState<PrototypeQuestion[]>(() => prototypeQuestions.map((item) => ({ ...item })))
  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState('Tất cả')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const { control, register, handleSubmit, reset, setError, formState: { errors } } = useForm<QuestionForm>({ defaultValues: { content: '', type: 'Một đáp án đúng', topic: 'Chủ đề mẫu A' } })

  const filtered = useMemo(() => questions.filter((question) => {
    const matchesSearch = question.prompt.toLocaleLowerCase('vi').includes(search.trim().toLocaleLowerCase('vi'))
    return matchesSearch && (topic === 'Tất cả' || question.topic === topic)
  }), [questions, search, topic])

  const openEditor = (question?: PrototypeQuestion) => {
    setEditingId(question?.id ?? null)
    reset({ content: question?.prompt ?? '', type: question?.type ?? 'Một đáp án đúng', topic: question?.topic ?? 'Chủ đề mẫu A' })
    setEditorOpen(true)
  }

  const save = handleSubmit((values) => {
    const parsed = questionSchema.safeParse(values)
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'content' || field === 'type' || field === 'topic') setError(field, { message: issue.message })
      })
      return
    }
    if (editingId) {
      setQuestions((items) => items.map((item) => item.id === editingId ? { ...item, prompt: parsed.data.content, type: parsed.data.type, topic: parsed.data.topic } : item))
    } else {
      setQuestions((items) => [...items, {
        id: `local-${items.length + 1}`,
        prompt: parsed.data.content,
        type: parsed.data.type,
        topic: parsed.data.topic,
        choices: parsed.data.type === 'Đúng/Sai' ? ['Đúng', 'Sai'] : ['Phương án A', 'Phương án B'],
      }])
    }
    setEditorOpen(false)
    setStatus('Đã lưu thay đổi cục bộ trong UI prototype; reload sẽ khôi phục dữ liệu.')
  })

  const remove = (question: PrototypeQuestion) => {
    Modal.confirm({
      title: 'Xác nhận xóa câu hỏi mock?',
      content: 'Thao tác chỉ thay đổi state cục bộ, không gọi backend.',
      okText: 'Xóa mock',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: () => {
        setQuestions((items) => items.filter((item) => item.id !== question.id))
        setStatus('Đã xóa câu hỏi khỏi state cục bộ.')
      },
    })
  }

  return (
    <section className="admin-page" data-screen-id="SCR-ADM-008">
      <div className="page-heading">
        <div><p className="eyebrow">QUIZ-001..QUIZ-003</p><h1>Ngân hàng câu hỏi</h1><p>Prototype CRUD local-only cho hai loại câu hỏi baseline.</p></div>
        <div className="inline-actions"><Link className="button-link button-link--quiet" to="/admin">Về Dashboard</Link><Button type="primary" onClick={() => openEditor()}>+ Thêm câu hỏi</Button></div>
      </div>
      <PrototypeNotice>Mock CRUD không persist, không sinh đề và không lộ đáp án cho User Portal.</PrototypeNotice>
      {status ? <PrototypeNotice tone="success">{status}</PrototypeNotice> : null}

      <div className="filter-panel">
        <label className="form-field filter-panel__search"><span>Tìm câu hỏi</span><Input value={search} onChange={(event) => setSearch(event.target.value)} allowClear /></label>
        <label className="form-field"><span>Chủ đề</span><select value={topic} onChange={(event) => setTopic(event.target.value)}><option>Tất cả</option><option>Chủ đề mẫu A</option><option>Chủ đề mẫu B</option></select></label>
      </div>

      {filtered.length === 0 ? <div className="state-panel"><strong>Không có câu hỏi phù hợp.</strong></div> : (
        <div className="table-region" role="region" aria-label="Bảng câu hỏi có thể cuộn ngang" tabIndex={0}>
          <Table<PrototypeQuestion>
            rowKey="id"
            dataSource={filtered}
            pagination={false}
            columns={[
              { title: 'Nội dung', dataIndex: 'prompt', width: 300 },
              { title: 'Loại', dataIndex: 'type' },
              { title: 'Chủ đề', dataIndex: 'topic' },
              { title: 'Trạng thái', render: () => 'Mock local' },
              { title: 'Thao tác', render: (_, record) => <div className="table-actions"><Button onClick={() => openEditor(record)}>Sửa</Button><Button danger onClick={() => remove(record)}>Xóa</Button></div> },
            ]}
          />
        </div>
      )}
      <PaginationBar current={1} total={1} onChange={() => undefined} label="Phân trang ngân hàng câu hỏi" />

      <Modal title={editingId ? 'Sửa câu hỏi — local mock' : 'Thêm câu hỏi — local mock'} open={editorOpen} onCancel={() => setEditorOpen(false)} footer={null} destroyOnHidden>
        <form className="form-stack modal-form" onSubmit={save} noValidate>
          <label className="form-field"><span>Nội dung câu hỏi</span><Controller name="content" control={control} render={({ field }) => <Input.TextArea {...field} rows={3} status={errors.content ? 'error' : undefined} />} />{errors.content ? <small className="field-error">{errors.content.message}</small> : null}</label>
          <label className="form-field"><span>Loại câu hỏi</span><select {...register('type')}><option>Một đáp án đúng</option><option>Đúng/Sai</option></select></label>
          <label className="form-field"><span>Chủ đề</span><select {...register('topic')}><option>Chủ đề mẫu A</option><option>Chủ đề mẫu B</option></select></label>
          <PrototypeNotice>Options/correct-answer chỉ là capability placeholder; không final DTO hoặc quiz generation.</PrototypeNotice>
          <div className="modal-actions"><Button onClick={() => setEditorOpen(false)}>Hủy</Button><Button type="primary" htmlType="submit">Lưu mock</Button></div>
        </form>
      </Modal>
    </section>
  )
}
