// P0 UI-report mock boundary. Replace this module with real adapters later;
// no value here is production data or an accepted business rule.

export type HandbookArticle = {
  id: string
  title: string
  category: string
  excerpt: string
  status: 'Đã đăng' | 'Chưa đăng'
}

export const handbookArticles: HandbookArticle[] = [
  {
    id: 'dieu-lenh-quan-ly',
    title: 'Điều lệnh quản lý bộ đội',
    category: 'Điều lệnh',
    excerpt: 'Nội dung mẫu phục vụ kiểm tra bố cục danh sách Cẩm nang.',
    status: 'Đã đăng',
  },
  {
    id: 'che-do-trong-ngay',
    title: 'Chế độ trong ngày',
    category: 'Chế độ',
    excerpt: 'Mô tả ngắn dạng mock, không phải nội dung nghiệp vụ thật.',
    status: 'Đã đăng',
  },
  {
    id: 'ky-nang-tinh-huong',
    title: 'Kỹ năng xử lý tình huống',
    category: 'Kỹ năng',
    excerpt: 'Bài mẫu để kiểm tra search, filter và trang chi tiết.',
    status: 'Chưa đăng',
  },
  {
    id: 'quy-dinh-noi-vu',
    title: 'Quy định nội vụ mẫu',
    category: 'Quy định',
    excerpt: 'Dữ liệu giao diện trung tính cho pagination.',
    status: 'Đã đăng',
  },
]

export type QuizSummary = {
  id: string
  title: string
  questionCount: number
  configuredMinutes: number
  passThresholdLabel: string
  status: 'open' | 'closed'
}

export const quizSummaries: QuizSummary[] = [
  {
    id: 'nhan-thuc-mau',
    title: 'Kiểm tra nhận thức — bản mẫu',
    questionCount: 3,
    configuredMinutes: 20,
    passThresholdLabel: 'Theo cấu hình kỳ kiểm tra',
    status: 'open',
  },
  {
    id: 'chuyen-de-mau',
    title: 'Kiểm tra chuyên đề — bản mẫu',
    questionCount: 3,
    configuredMinutes: 15,
    passThresholdLabel: 'Theo cấu hình kỳ kiểm tra',
    status: 'open',
  },
  {
    id: 'ky-da-dong',
    title: 'Kỳ kiểm tra đã đóng',
    questionCount: 3,
    configuredMinutes: 10,
    passThresholdLabel: 'Theo cấu hình kỳ kiểm tra',
    status: 'closed',
  },
]

export type PrototypeQuestion = {
  id: string
  prompt: string
  type: 'Một đáp án đúng' | 'Đúng/Sai'
  topic: string
  choices: string[]
}

export const prototypeQuestions: PrototypeQuestion[] = [
  {
    id: 'q-01',
    prompt: 'Nội dung câu hỏi trình diễn số 01?',
    type: 'Một đáp án đúng',
    topic: 'Chủ đề mẫu A',
    choices: ['Phương án mẫu A', 'Phương án mẫu B', 'Phương án mẫu C', 'Phương án mẫu D'],
  },
  {
    id: 'q-02',
    prompt: 'Nội dung câu hỏi trình diễn số 02?',
    type: 'Đúng/Sai',
    topic: 'Chủ đề mẫu B',
    choices: ['Đúng', 'Sai'],
  },
  {
    id: 'q-03',
    prompt: 'Nội dung câu hỏi trình diễn số 03?',
    type: 'Một đáp án đúng',
    topic: 'Chủ đề mẫu A',
    choices: ['Lựa chọn 1', 'Lựa chọn 2', 'Lựa chọn 3'],
  },
]

export const rankingRows = [
  { rank: 1, subject: 'Người dùng 01', unit: 'Đơn vị mẫu A', score: '—' },
  { rank: 2, subject: 'Người dùng 02', unit: 'Đơn vị mẫu B', score: '—' },
  { rank: 3, subject: 'Người dùng 03', unit: 'Đơn vị mẫu A', score: '—' },
]

export const handbookCategories = ['Tất cả', 'Điều lệnh', 'Chế độ', 'Quy định', 'Kỹ năng']
