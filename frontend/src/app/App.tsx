import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { HomePage } from '../pages/home/HomePage'
import { ModulePlaceholderPage } from '../pages/module/ModulePlaceholderPage'
import { AdminLayout } from '../layouts/AdminLayout'
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage'
import { moduleDefinitions } from '../shared/config/moduleDefinitions'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />

      {moduleDefinitions.map((module) => (
        <Route
          key={module.key}
          path={module.path}
          element={<ModulePlaceholderPage module={module} />}
        />
      ))}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route
          path="question-bank"
          element={<ModulePlaceholderPage title="Ngân hàng câu hỏi" backTo="/admin" />}
        />
        <Route
          path="handbook"
          element={<ModulePlaceholderPage title="Quản lý Cẩm nang người lính" backTo="/admin" />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
