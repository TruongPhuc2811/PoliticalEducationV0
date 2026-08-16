import { useMemo, useState } from 'react'
import { Button, Input, Modal, Table } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { PaginationBar } from '../../shared/components/PaginationBar'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'
import { handbookArticles, type HandbookArticle } from '../../shared/mocks/p0PrototypeData'

const handbookSchema = z.object({
  title: z.string().trim().min(1, 'Vui lòng nhập tiêu đề.'),
  category: z.string().trim().min(1, 'Vui lòng chọn danh mục.'),
  content: z.string().trim().min(1, 'Vui lòng nhập nội dung mẫu.'),
})
type HandbookForm = z.infer<typeof handbookSchema>

export function AdminHandbookPage() {
  const [articles, setArticles] = useState<HandbookArticle[]>(() => handbookArticles.map((item) => ({ ...item })))
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tất cả')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const { control, register, handleSubmit, reset, setError, formState: { errors } } = useForm<HandbookForm>({ defaultValues: { title: '', category: 'Điều lệnh', content: '' } })

  const filtered = useMemo(() => articles.filter((article) => {
    const matchesSearch = article.title.toLocaleLowerCase('vi').includes(search.trim().toLocaleLowerCase('vi'))
    return matchesSearch && (category === 'Tất cả' || article.category === category)
  }), [articles, category, search])

  const openEditor = (article?: HandbookArticle) => {
    setEditingId(article?.id ?? null)
    reset({ title: article?.title ?? '', category: article?.category ?? 'Điều lệnh', content: article?.excerpt ?? '' })
    setEditorOpen(true)
  }

  const save = handleSubmit((values) => {
    const parsed = handbookSchema.safeParse(values)
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'title' || field === 'category' || field === 'content') setError(field, { message: issue.message })
      })
      return
    }
    if (editingId) {
      setArticles((items) => items.map((item) => item.id === editingId ? { ...item, title: parsed.data.title, category: parsed.data.category, excerpt: parsed.data.content } : item))
    } else {
      setArticles((items) => [...items, { id: `local-${items.length + 1}`, title: parsed.data.title, category: parsed.data.category, excerpt: parsed.data.content, status: 'Chưa đăng' }])
    }
    setEditorOpen(false)
    setStatus('Đã lưu bài trong state cục bộ; không upload hoặc gọi backend.')
  })

  const publish = (article: HandbookArticle) => {
    setArticles((items) => items.map((item) => item.id === article.id ? { ...item, status: 'Đã đăng' } : item))
    setStatus('Đã chuyển trạng thái “Đã đăng” trong mock UI; không có workflow duyệt.')
  }

  const remove = (article: HandbookArticle) => {
    Modal.confirm({
      title: 'Xác nhận xóa bài mock?',
      content: 'Không có dữ liệu backend bị thay đổi.',
      okText: 'Xóa mock', cancelText: 'Hủy', okButtonProps: { danger: true },
      onOk: () => { setArticles((items) => items.filter((item) => item.id !== article.id)); setStatus('Đã xóa bài khỏi state cục bộ.') },
    })
  }

  return (
    <section className="admin-page" data-screen-id="SCR-ADM-004">
      <div className="page-heading">
        <div><p className="eyebrow">HAN-001..HAN-003 · FILE-001</p><h1>Quản lý Cẩm nang</h1><p>Table/form/publish presentation theo Admin P0.</p></div>
        <div className="inline-actions"><Link className="button-link button-link--quiet" to="/admin">Về Dashboard</Link><Button type="primary" onClick={() => openEditor()}>+ Thêm bài</Button></div>
      </div>
      <PrototypeNotice tone="warning">Không upload thật. Upload limit chờ OI-005; Office preview chờ OI-015.</PrototypeNotice>
      {status ? <PrototypeNotice tone="success">{status}</PrototypeNotice> : null}

      <div className="filter-panel">
        <label className="form-field filter-panel__search"><span>Tìm bài</span><Input value={search} onChange={(event) => setSearch(event.target.value)} allowClear /></label>
        <label className="form-field"><span>Danh mục</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Tất cả</option><option>Điều lệnh</option><option>Chế độ</option><option>Quy định</option><option>Kỹ năng</option></select></label>
      </div>

      {filtered.length === 0 ? <div className="state-panel"><strong>Không có bài phù hợp.</strong></div> : (
        <div className="table-region" role="region" aria-label="Bảng quản lý Cẩm nang có thể cuộn ngang" tabIndex={0}>
          <Table<HandbookArticle>
            rowKey="id" dataSource={filtered} pagination={false}
            columns={[
              { title: 'Tiêu đề', dataIndex: 'title', width: 260 },
              { title: 'Danh mục', dataIndex: 'category' },
              { title: 'Trạng thái', dataIndex: 'status' },
              { title: 'Ngày mẫu', render: () => '—' },
              { title: 'Thao tác', render: (_, record) => <div className="table-actions"><Button onClick={() => openEditor(record)}>Sửa</Button><Button onClick={() => publish(record)}>Đăng</Button><Button danger onClick={() => remove(record)}>Xóa</Button></div> },
            ]}
          />
        </div>
      )}
      <PaginationBar current={1} total={1} onChange={() => undefined} label="Phân trang quản lý Cẩm nang" />

      <Modal title={editingId ? 'Sửa bài Cẩm nang — local mock' : 'Thêm bài Cẩm nang — local mock'} open={editorOpen} onCancel={() => setEditorOpen(false)} footer={null} destroyOnHidden>
        <form className="form-stack modal-form" onSubmit={save} noValidate>
          <label className="form-field"><span>Tiêu đề</span><Controller name="title" control={control} render={({ field }) => <Input {...field} status={errors.title ? 'error' : undefined} />} />{errors.title ? <small className="field-error">{errors.title.message}</small> : null}</label>
          <label className="form-field"><span>Danh mục</span><select {...register('category')}><option>Điều lệnh</option><option>Chế độ</option><option>Quy định</option><option>Kỹ năng</option></select></label>
          <label className="form-field"><span>Nội dung</span><Controller name="content" control={control} render={({ field }) => <Input.TextArea {...field} rows={4} status={errors.content ? 'error' : undefined} />} />{errors.content ? <small className="field-error">{errors.content.message}</small> : null}</label>
          <label className="form-field"><span>File/media placeholder</span><input type="file" onChange={() => setStatus('Đã chọn tên file trong form; prototype không đọc nội dung hoặc upload.')} /><small className="muted">Không đọc file vào memory; không có size rule vì OI-005.</small></label>
          <div className="modal-actions"><Button onClick={() => setEditorOpen(false)}>Hủy</Button><Button type="primary" htmlType="submit">Lưu mock</Button></div>
        </form>
      </Modal>
    </section>
  )
}
