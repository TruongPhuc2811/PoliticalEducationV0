import { Link } from 'react-router-dom'
import { UserPortalHeader } from '../../shared/components/UserPortalHeader'
import { moduleDefinitions } from '../../shared/config/moduleDefinitions'

export function HomePage() {
  return (
    <div className="portal-page" data-screen-id="SCR-HOME-001">
      <UserPortalHeader />
      <main className="page-container">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero__content">
            <p className="eyebrow">CỔNG HỌC TẬP TRỰC TUYẾN</p>
            <h1 id="home-title">Bồi dưỡng bản lĩnh, nâng cao nhận thức</h1>
            <p>Không gian truy cập tập trung cho chín phân hệ giáo dục chính trị của đơn vị.</p>
            <span className="prototype-chip">Dữ liệu trình diễn · Không kết nối backend</span>
          </div>
          <div className="hero-star" aria-hidden="true">★</div>
        </section>

        <section aria-labelledby="modules-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">DANH MỤC CHỨC NĂNG</p>
              <h2 id="modules-title">Chín phân hệ chính</h2>
            </div>
            <span className="muted">3 phân hệ có luồng P0 · 6 phân hệ chờ P1</span>
          </div>
          <div className="module-grid">
            {moduleDefinitions.map((module, index) => {
              const content = (
                <>
                  <span className="module-card__top">
                    <span className="module-icon" aria-hidden="true">{module.icon}</span>
                    <span className="module-index">0{index + 1}</span>
                  </span>
                  <span>
                    <strong>{module.title}</strong>
                    <small>{module.description}</small>
                  </span>
                  <span className="module-status">{module.p0Available ? 'Mở luồng P0 →' : 'P1 · Sắp triển khai'}</span>
                </>
              )

              return module.p0Available ? (
                <Link
                  key={module.key}
                  to={module.path}
                  className={`module-card module-card--${index + 1}`}
                  data-testid="module-card"
                  data-module={module.title}
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={module.key}
                  type="button"
                  className={`module-card module-card--${index + 1}`}
                  data-testid="module-card"
                  data-module={module.title}
                  disabled
                  aria-label={`${module.title} — phân hệ P1 chưa triển khai`}
                >
                  {content}
                </button>
              )
            })}
          </div>
        </section>

        <section className="home-highlights" aria-label="Thông tin nổi bật">
          <article className="teaching-card">
            <p className="eyebrow">LỜI BÁC HỒ DẠY HÔM NAY</p>
            <h2>Vùng nội dung theo ngày</h2>
            <blockquote>Chưa có dữ liệu thật trong UI prototype.</blockquote>
            <p>Empty-state có chủ ý theo HCM-003; không tạo lời dạy giả.</p>
          </article>
          <article className="ranking-highlight">
            <p className="eyebrow">THI ĐUA</p>
            <h2>Bảng xếp hạng công khai</h2>
            <p>Mock presentation; công thức và hierarchy vẫn chờ OI-002/OI-012/OI-014.</p>
            <Link className="button-link button-link--quiet" to="/competition/ranking">Xem bảng xếp hạng</Link>
          </article>
        </section>
      </main>
    </div>
  )
}
