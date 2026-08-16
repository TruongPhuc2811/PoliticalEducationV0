export type ModuleDefinition = {
  key: string
  title: string
  description: string
  path: string
  requirement: string
}

export const moduleDefinitions: ModuleDefinition[] = [
  {
    key: 'handbook',
    title: 'Cẩm nang người lính',
    description: 'Điều lệnh, quy định, kiến thức và kỹ năng.',
    path: '/handbook',
    requirement: 'SCOPE-001',
  },
  {
    key: 'resolution',
    title: 'Học tập nghị quyết',
    description: 'Nghị quyết, chuyên đề, tài liệu và video.',
    path: '/resolutions',
    requirement: 'SCOPE-002',
  },
  {
    key: 'news',
    title: 'Đọc báo và nghe tin',
    description: 'Tin tức, video và nguồn bài báo.',
    path: '/news',
    requirement: 'SCOPE-003',
  },
  {
    key: 'music',
    title: 'Kho tàng âm nhạc',
    description: 'Âm nhạc, video và nội dung truyền thống.',
    path: '/music',
    requirement: 'SCOPE-004',
  },
  {
    key: 'quiz',
    title: 'Kiểm tra trắc nghiệm',
    description: 'Kỳ kiểm tra, làm bài và kết quả.',
    path: '/quizzes',
    requirement: 'SCOPE-005',
  },
  {
    key: 'political-education',
    title: 'Giáo dục chính trị',
    description: 'Chương trình, chủ đề và bài giảng.',
    path: '/political-education',
    requirement: 'SCOPE-006',
  },
  {
    key: 'ho-chi-minh',
    title: 'Lời Bác Hồ dạy',
    description: 'Lời dạy hôm nay và nội dung liên quan.',
    path: '/ho-chi-minh',
    requirement: 'SCOPE-007',
  },
  {
    key: 'weekly-question',
    title: 'Mỗi tuần một câu hỏi',
    description: 'Một câu hỏi kiến thức trắc nghiệm mỗi tuần.',
    path: '/weekly-question',
    requirement: 'SCOPE-008',
  },
  {
    key: 'competition',
    title: 'Chấm điểm thi đua',
    description: 'Điểm và bảng xếp hạng thi đua.',
    path: '/competition',
    requirement: 'SCOPE-009',
  },
]
