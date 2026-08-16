import { useState } from 'react'
import { Button, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Vui lòng nhập tên đăng nhập.'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu.'),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [mockError, setMockError] = useState('')
  const { control, handleSubmit, formState: { errors }, setError } = useForm<LoginValues>({ defaultValues: { username: '', password: '' } })

  const submit = handleSubmit(async (values) => {
    setMockError('')
    const parsed = loginSchema.safeParse(values)
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'username' || field === 'password') {
          setError(field, { message: issue.message })
        }
      })
      return
    }

    setSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 250))
    if (parsed.data.username.toLocaleLowerCase('vi') === 'loi-mau') {
      setMockError('Không thể đăng nhập trong kịch bản lỗi mẫu. Không có yêu cầu nào được gửi đi.')
      setSubmitting(false)
      return
    }
    navigate('/home')
  })

  return (
    <main className="auth-page" data-screen-id="SCR-AUTH-001">
      <section className="auth-identity" aria-labelledby="system-name">
        <span className="auth-emblem" aria-hidden="true">★</span>
        <p className="eyebrow">P0 UI REPORTING PROTOTYPE</p>
        <h1 id="system-name">Hệ thống Giáo dục Chính trị</h1>
        <p>Cổng nội dung học tập và quản trị dành cho một đơn vị.</p>
        <small>P0 prototype tokens — subject to V0.5 UI Guideline.</small>
      </section>

      <section className="auth-card" aria-labelledby="login-title">
        <div>
          <p className="eyebrow">CHÀO MỪNG TRỞ LẠI</p>
          <h2 id="login-title">Đăng nhập</h2>
          <p className="muted">Thông tin chỉ dùng để mô phỏng điều hướng, không gửi tới backend.</p>
        </div>

        <form className="form-stack" onSubmit={submit} noValidate>
          <label className="form-field">
            <span>Tên đăng nhập</span>
            <Controller name="username" control={control} render={({ field }) => <Input {...field} autoComplete="username" status={errors.username ? 'error' : undefined} aria-invalid={Boolean(errors.username)} />} />
            {errors.username ? <small className="field-error">{errors.username.message}</small> : null}
          </label>
          <label className="form-field">
            <span>Mật khẩu</span>
            <Controller name="password" control={control} render={({ field }) => <Input.Password {...field} autoComplete="current-password" status={errors.password ? 'error' : undefined} aria-invalid={Boolean(errors.password)} />} />
            {errors.password ? <small className="field-error">{errors.password.message}</small> : null}
          </label>
          {mockError ? <PrototypeNotice tone="error">{mockError}</PrototypeNotice> : null}
          <Button type="primary" htmlType="submit" size="large" loading={submitting} block>
            Đăng nhập
          </Button>
        </form>

        <p className="auth-switch">Chưa có tài khoản? <Link to="/register">Đăng ký bằng mã giới thiệu</Link></p>
        <PrototypeNotice>Mock boundary: không JWT, session, cookie hoặc user lookup.</PrototypeNotice>
      </section>
    </main>
  )
}
