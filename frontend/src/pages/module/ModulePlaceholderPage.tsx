import { Button, Card, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import type { ModuleDefinition } from '../../shared/config/moduleDefinitions'

type Props = {
  module?: ModuleDefinition
  title?: string
  backTo?: string
}

export function ModulePlaceholderPage({ module, title, backTo = '/home' }: Props) {
  const pageTitle = title ?? module?.title ?? 'Phân hệ'

  return (
    <main className="app-shell">
      <Card>
        <Space direction="vertical" size="middle">
          <Typography.Title level={2}>{pageTitle}</Typography.Title>
          {module ? (
            <>
              <Typography.Paragraph>{module.description}</Typography.Paragraph>
              <Typography.Text code>{module.requirement}</Typography.Text>
            </>
          ) : null}
          <Typography.Text type="secondary">
            Màn hình placeholder trong khung xương. Chi tiết sẽ bám Screen ID và wireframe.
          </Typography.Text>
          <Link to={backTo}>
            <Button>Quay lại</Button>
          </Link>
        </Space>
      </Card>
    </main>
  )
}
