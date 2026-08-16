import { useState } from 'react'
import { Button } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'
import { UserPortalHeader } from '../../shared/components/UserPortalHeader'
import { handbookArticles } from '../../shared/mocks/p0PrototypeData'

export function HandbookDetailPage() {
  const { contentId } = useParams()
  const [mediaOpened, setMediaOpened] = useState(false)
  const [downloadNotice, setDownloadNotice] = useState(false)
  const article = handbookArticles.find((item) => item.id === contentId)

  return (
    <div className="portal-page" data-screen-id="SCR-HAN-003">
      <UserPortalHeader />
      <main className="page-container article-page">
        {!article ? (
          <section className="state-panel" aria-labelledby="not-found-title">
            <h1 id="not-found-title">Bài viết không khả dụng</h1>
            <p>Không tìm thấy nội dung mock tương ứng.</p>
            <Link className="button-link" to="/handbook">Quay lại danh sách</Link>
          </section>
        ) : (
          <article>
            <div className="page-heading">
              <div>
                <p className="breadcrumb"><Link to="/home">Trang chủ</Link> / <Link to="/handbook">Cẩm nang</Link> / {article.category}</p>
                <span className="content-category">{article.category}</span>
                <h1>{article.title}</h1>
                <p className="muted">Nội dung trình diễn · Không phải dữ liệu production</p>
              </div>
              <Link className="button-link button-link--quiet" to="/handbook">Quay lại danh sách</Link>
            </div>

            <div className={`media-stage ${mediaOpened ? 'media-stage--active' : ''}`}>
              <span aria-hidden="true">{mediaOpened ? '▶' : '▧'}</span>
              <strong>{mediaOpened ? 'Media preview mock' : 'Ảnh / video placeholder'}</strong>
              <small>Chỉ mở theo thao tác; không preload hoặc autoplay.</small>
            </div>
            <div className="inline-actions">
              <Button type="primary" onClick={() => setMediaOpened((value) => !value)}>
                {mediaOpened ? 'Đóng media mock' : 'Xem media (mock)'}
              </Button>
              <Button onClick={() => setDownloadNotice(true)}>Tải tài liệu (mock)</Button>
            </div>
            {downloadNotice ? <PrototypeNotice>Không có file thật. Preview Office/fallback vẫn chờ OI-015.</PrototypeNotice> : null}
            <PrototypeNotice tone="warning">Giới hạn upload chờ OI-005; khả năng preview Word/PowerPoint chờ OI-015.</PrototypeNotice>

            <section className="article-body">
              <h2>Nội dung bài viết</h2>
              <p>Đây là khối văn bản mẫu giúp kiểm tra chiều rộng đọc, khoảng cách và phân cấp nội dung trên desktop lẫn mobile.</p>
              <h3>Nội dung chính</h3>
              <p>Prototype không tải media, không lưu lịch sử đọc và không kết nối dữ liệu nghiệp vụ.</p>
            </section>
          </article>
        )}
      </main>
    </div>
  )
}
