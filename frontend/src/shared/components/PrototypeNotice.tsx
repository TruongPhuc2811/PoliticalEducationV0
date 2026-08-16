import type { PropsWithChildren } from 'react'

type PrototypeNoticeProps = PropsWithChildren<{
  tone?: 'info' | 'warning' | 'success' | 'error'
  testId?: string
}>

export function PrototypeNotice({
  children,
  tone = 'info',
  testId,
}: PrototypeNoticeProps) {
  return (
    <div className={`prototype-notice prototype-notice--${tone}`} role="status" data-testid={testId}>
      {children}
    </div>
  )
}
