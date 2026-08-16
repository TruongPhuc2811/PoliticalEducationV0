import { useMemo, useState } from 'react'
import { Button, Input } from 'antd'
import { Link } from 'react-router-dom'
import { PaginationBar } from '../../shared/components/PaginationBar'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'
import { UserPortalHeader } from '../../shared/components/UserPortalHeader'
import { handbookArticles, handbookCategories } from '../../shared/mocks/p0PrototypeData'

const pageSize = 3
type DemoState = 'default' | 'loading' | 'error'

export function HandbookListPage() {
  const [term, setTerm] = useState('')
  const [category, setCategory] = useState('Tất cả')
  const [page, setPage] = useState(1)
  const [demoState, setDemoState] = useState<DemoState>('default')

  const filtered = useMemo(() => {
    const normalized = term.trim().toLocaleLowerCase('vi')
    return handbookArticles.filter((article) => {
      const matchesTerm = !normalized || `${article.title} ${article.excerpt}`.toLocaleLowerCase('vi').includes(normalized)
      const matchesCategory = category === 'Tất cả' || article.category === category
      return matchesTerm && matchesCategory
    })
  }, [category, term])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visibleArticles = filtered.slice((page - 1) * pageSize, page * pageSize)

  const updateCategory = (value: string) => {
    setCategory(value)
    setPage(1)
  }

  return (
    <div className="portal-page" data-screen-id="SCR-HAN-002">
      <UserPortalHeader />
      <main className="page-container content-page">
        <div className="page-heading">
          <div>
            <p className="breadcrumb"><Link to="/home">Trang chủ</Link> / Cẩm nang người lính</p>
            <p className="eyebrow">CẨM NANG NGƯỜI LÍNH</p>
            <h1>Danh sách bài viết</h1>
            <p>Tìm kiếm chỉ trong phân hệ Cẩm nang trên tập dữ liệu mock nhỏ.</p>
          </div>
          <Link className="button-link button-link--quiet" to="/home">Về trang chủ</Link>
        </div>

        <section className="content-layout">
          <div className="content-main">
            <form className="filter-panel" onSubmit={(event) => { event.preventDefault(); setPage(1) }}>
              <label className="form-field filter-panel__search">
                <span>Tìm trong Cẩm nang</span>
                <Input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Nhập từ khóa" allowClear />
              </label>
              <Button type="primary" htmlType="submit">Tìm kiếm</Button>
              <Button onClick={() => { setTerm(''); setCategory('Tất cả'); setPage(1) }}>Đặt lại</Button>
            </form>

            <div className="prototype-state-control">
              <span>Trạng thái dữ liệu demo:</span>
              <select value={demoState} onChange={(event) => setDemoState(event.target.value as DemoState)}>
                <option value="default">Mặc định</option>
                <option value="loading">Loading</option>
                <option value="error">Error</option>
              </select>
            </div>

            {demoState === 'loading' ? <div className="state-panel" role="status">Đang tải danh sách Cẩm nang…</div> : null}
            {demoState === 'error' ? <PrototypeNotice tone="error">Không tải được dữ liệu mock. Chọn “Mặc định” để thử lại.</PrototypeNotice> : null}
            {demoState === 'default' && visibleArticles.length === 0 ? (
              <div className="state-panel" role="status"><strong>Không tìm thấy bài phù hợp.</strong><span>Hãy đổi từ khóa hoặc danh mục.</span></div>
            ) : null}

            {demoState === 'default' && visibleArticles.length > 0 ? (
              <ul className="content-list" aria-label="Danh sách bài Cẩm nang">
                {visibleArticles.map((article) => (
                  <li key={article.id} className="content-list-item">
                    <div className="content-thumbnail" aria-hidden="true">★</div>
                    <div>
                      <span className="content-category">{article.category}</span>
                      <h2>{article.title}</h2>
                      <p>{article.excerpt}</p>
                      <Link className="text-action" to={`/handbook/${article.id}`}>Xem bài →</Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            <PaginationBar current={Math.min(page, totalPages)} total={totalPages} onChange={setPage} label="Phân trang Cẩm nang" />
          </div>

          <aside className="filter-sidebar">
            <h2>Danh mục</h2>
            <label className="form-field">
              <span>Chọn danh mục</span>
              <select value={category} onChange={(event) => updateCategory(event.target.value)}>
                {handbookCategories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <PrototypeNotice>Danh sách có phân trang; media chỉ hiển thị thumbnail.</PrototypeNotice>
          </aside>
        </section>
      </main>
    </div>
  )
}
