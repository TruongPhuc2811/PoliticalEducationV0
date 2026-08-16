import { Button } from 'antd'

type PaginationBarProps = {
  current: number
  total: number
  onChange: (page: number) => void
  label: string
}

export function PaginationBar({ current, total, onChange, label }: PaginationBarProps) {
  return (
    <nav className="pagination-bar" aria-label={label}>
      <Button disabled={current <= 1} onClick={() => onChange(current - 1)}>
        Trước
      </Button>
      <span aria-current="page">Trang {current} / {Math.max(total, 1)}</span>
      <Button disabled={current >= total} onClick={() => onChange(current + 1)}>
        Sau
      </Button>
    </nav>
  )
}
