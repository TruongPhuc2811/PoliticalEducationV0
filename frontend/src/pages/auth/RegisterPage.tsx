import { useState } from 'react'
import { Button, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { PrototypeNotice } from '../../shared/components/PrototypeNotice'

const registerSchema = z.object({
  username: z.string().trim().min(1, 'Vui lòng nhập tên đăng nhập.'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu.'),
  invitationCode: z.string().trim().min(1, 'Vui lòng nhập mã giới thiệu.'),
})

type RegisterValues = z.infer<typeof registerSchema>

export function RegisterPage() {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'invalid' | 'success'>('idle')
  const { control, handleSubmit, formState: { errors }, setError } = useForm<RegisterValues>({ defaultValues: { username: '', password: '', invitationCode: '' } })

  const submit = handleSubmit(async (values) => {
    setStatus('idle')
    const parsed = registerSchema.safeParse(values)
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'username' || field === 'password' || field === 'invitationCode') {
          setError(field, { message: issue.message })
        }
      })
      return
    }

    setSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 250))
    setStatus(parsed.data.invitationCode.toLocaleLowerCase('vi') === 'invalid' ? 'invalid' : 'success')
    setSubmitting(false)
  })

  return (
    <main className="auth-page" data-screen-id="SCR-AUTH-002">
      <section className="auth-identity" aria-labelledby="register-system-name">
        <span className="auth-emblem" aria-hidden="true">★</span>
        <p className="eyebrow">P0 UI REPORTING PROTOTYPE</p>
        <h1 id="register-system-name">Hệ thống Giáo dục Chính trị</h1>
        <p>Đăng ký tối thiểu theo USR-002 và USR-003.</p>
      </section>

      <section className="auth-card" aria-labelledby="register-title">
        <div>
          <p className="eyebrow">TÀI KHOẢN NGƯỜI DÙNG</p>
          <h2 id="register-title">Đăng ký bằng mã giới thiệu</h2>
        </div>
        <PrototypeNotice tone="warning">
          Lifecycle mã đang chờ OI-006; prototype không giả định thời hạn, số lần dùng, quota hoặc đơn vị sở hữu.
        </PrototypeNotice>

        <form className="form-stack" onSubmit={submit} noValidate>
          <label className="form-field">
            <span>Tên đăng nhập</span>
            <Controller name="username" control={control} render={({ field }) => <Input {...field} autoComplete="username" status={errors.username ? 'error' : undefined} />} />
            {errors.username ? <small className="field-error">{errors.username.message}</small> : null}
          </label>
          <label className="form-field">
            <span>Mật khẩu</span>
            <Controller name="password" control={control} render={({ field }) => <Input.Password {...field} autoComplete="new-password" status={errors.password ? 'error' : undefined} />} />
            {errors.password ? <small className="field-error">{errors.password.message}</small> : null}
          </label>
          <label className="form-field">
            <span>Mã giới thiệu</span>
            <Controller name="invitationCode" control={control} render={({ field }) => <Input {...field} status={errors.invitationCode ? 'error' : undefined} />} />
            <small className="muted">Nhập “invalid” để xem generic invalid state của prototype.</small>
            {errors.invitationCode ? <small className="field-error">{errors.invitationCode.message}</small> : null}
          </label>

          {status === 'invalid' ? (
            <PrototypeNotice tone="error" testId="register-invalid">Mã giới thiệu không hợp lệ. Không có tài khoản được tạo.</PrototypeNotice>
          ) : null}
          {status === 'success' ? (
            <PrototypeNotice tone="success" testId="register-success">
              Đăng ký mock thành công. Prototype không tạo tài khoản và không tự đăng nhập.
            </PrototypeNotice>
          ) : null}

          <Button type="primary" htmlType="submit" size="large" loading={submitting} block>
            Đăng ký
          </Button>
        </form>
        <p className="auth-switch"><Link to="/login">Quay lại đăng nhập</Link></p>
      </section>
    </main>
  )
}
