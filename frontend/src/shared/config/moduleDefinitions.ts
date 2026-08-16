export type ModuleDefinition = {
  key: string
  icon: string
  title: string
  description: string
  path: string
  requirement: string
  p0Available: boolean
}

export const moduleDefinitions: ModuleDefinition[] = [
  {
    key: 'handbook',
    icon: '★',
    title: 'Cẩm nang người lính',
    description: 'Điều lệnh, quy định, kiến thức và kỹ năng.',
    path: '/handbook',
    requirement: 'SCOPE-001',
    p0Available: true,
  },
  {
    key: 'resolution',
    icon: '▤',
    title: 'Học tập nghị quyết',
    description: 'Nghị quyết, chuyên đề, tài liệu và video.',
    path: '/resolutions',
    requirement: 'SCOPE-002',
    p0Available: false,
  },
  {
    key: 'news',
    icon: '▥',
    title: 'Đọc báo và nghe tin',
    description: 'Tin tức, video và nguồn bài báo.',
    path: '/news',
    requirement: 'SCOPE-003',
    p0Available: false,
  },
  {
    key: 'music',
    icon: '♫',
    title: 'Kho tàng âm nhạc',
    description: 'Âm nhạc, video và nội dung truyền thống.',
    path: '/music',
    requirement: 'SCOPE-004',
    p0Available: false,
  },
  {
    key: 'quiz',
    icon: '✓',
    title: 'Kiểm tra trắc nghiệm',
    description: 'Kỳ kiểm tra, làm bài và kết quả.',
    path: '/quizzes',
    requirement: 'SCOPE-005',
    p0Available: true,
  },
  {
    key: 'political-education',
    icon: '▣',
    title: 'Giáo dục chính trị',
    description: 'Chương trình, chủ đề và bài giảng.',
    path: '/political-education',
    requirement: 'SCOPE-006',
    p0Available: false,
  },
  {
    key: 'ho-chi-minh',
    icon: '✦',
    title: 'Lời Bác Hồ dạy',
    description: 'Lời dạy hôm nay và nội dung liên quan.',
    path: '/ho-chi-minh',
    requirement: 'SCOPE-007',
    p0Available: false,
  },
  {
    key: 'weekly-question',
    icon: '?',
    title: 'Mỗi tuần một câu hỏi',
    description: 'Một câu hỏi kiến thức trắc nghiệm mỗi tuần.',
    path: '/weekly-question',
    requirement: 'SCOPE-008',
    p0Available: false,
  },
  {
    key: 'competition',
    icon: '♛',
    title: 'Chấm điểm thi đua',
    description: 'Điểm và bảng xếp hạng thi đua.',
    path: '/competition/ranking',
    requirement: 'SCOPE-009',
    p0Available: true,
  },
]
