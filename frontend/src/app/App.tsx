import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const LoginPage = lazy(() => import('../pages/auth/LoginPage').then((module) => ({ default: module.LoginPage })))
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then((module) => ({ default: module.RegisterPage })))
const HomePage = lazy(() => import('../pages/home/HomePage').then((module) => ({ default: module.HomePage })))
const HandbookListPage = lazy(() => import('../pages/handbook/HandbookListPage').then((module) => ({ default: module.HandbookListPage })))
const HandbookDetailPage = lazy(() => import('../pages/handbook/HandbookDetailPage').then((module) => ({ default: module.HandbookDetailPage })))
const QuizListPage = lazy(() => import('../pages/quiz/QuizListPage').then((module) => ({ default: module.QuizListPage })))
const QuizAttemptPage = lazy(() => import('../pages/quiz/QuizAttemptPage').then((module) => ({ default: module.QuizAttemptPage })))
const QuizResultPage = lazy(() => import('../pages/quiz/QuizResultPage').then((module) => ({ default: module.QuizResultPage })))
const CompetitionRankingPage = lazy(() => import('../pages/competition/CompetitionRankingPage').then((module) => ({ default: module.CompetitionRankingPage })))
const AdminLayout = lazy(() => import('../layouts/AdminLayout').then((module) => ({ default: module.AdminLayout })))
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage').then((module) => ({ default: module.AdminDashboardPage })))
const QuestionBankPage = lazy(() => import('../pages/admin/QuestionBankPage').then((module) => ({ default: module.QuestionBankPage })))
const AdminHandbookPage = lazy(() => import('../pages/admin/AdminHandbookPage').then((module) => ({ default: module.AdminHandbookPage })))

export function App() {
  return (
    <Suspense fallback={<main className="route-loading" role="status">Đang tải giao diện…</main>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/handbook" element={<HandbookListPage />} />
        <Route path="/handbook/:contentId" element={<HandbookDetailPage />} />
        <Route path="/quizzes" element={<QuizListPage />} />
        <Route path="/quizzes/:quizId/attempt" element={<QuizAttemptPage />} />
        <Route path="/quizzes/:quizId/result" element={<QuizResultPage />} />
        <Route path="/competition/ranking" element={<CompetitionRankingPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="question-bank" element={<QuestionBankPage />} />
          <Route path="handbook" element={<AdminHandbookPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  )
}
