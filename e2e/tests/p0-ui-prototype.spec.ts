import { expect, test, type Page } from '@playwright/test'

async function loginToHome(page: Page) {
  await page.goto('/login')
  await page.getByLabel('Tên đăng nhập').fill('nguoi-dung-mau')
  await page.getByLabel('Mật khẩu').fill('mat-khau-mau')
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click()
  await expect(page).toHaveURL(/\/home$/)
}

async function expectNoGlobalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }))
  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth + 1)
}

test('E2E-P0-UI-001 [USR-001..USR-003, HOME-001] Register/Login → Home có đúng 9 phân hệ', async ({ page }) => {
  await page.goto('/register')
  await page.getByLabel('Tên đăng nhập').fill('nguoi-dung-mau')
  await page.getByLabel('Mật khẩu').fill('mat-khau-mau')
  await page.getByRole('textbox', { name: /Mã giới thiệu/ }).fill('invalid')
  await page.getByRole('button', { name: 'Đăng ký', exact: true }).click()
  await expect(page.getByTestId('register-invalid')).toBeVisible()

  await page.getByRole('textbox', { name: /Mã giới thiệu/ }).fill('MA-DEMO')
  await page.getByRole('button', { name: 'Đăng ký', exact: true }).click()
  await expect(page.getByTestId('register-success')).toBeVisible()
  await page.getByRole('link', { name: 'Quay lại đăng nhập' }).click()

  await page.getByLabel('Tên đăng nhập').fill('nguoi-dung-mau')
  await page.getByLabel('Mật khẩu').fill('mat-khau-mau')
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click()
  await expect(page).toHaveURL(/\/home$/)
  await expect(page.getByTestId('module-card')).toHaveCount(9)
  await expectNoGlobalOverflow(page)
})

test('E2E-P0-UI-002 [HAN-004, HAN-005] Home → Cẩm nang → search → detail → back', async ({ page }) => {
  await loginToHome(page)
  await page.getByTestId('module-card').filter({ hasText: 'Cẩm nang người lính' }).click()
  await expect(page.getByRole('heading', { name: 'Danh sách bài viết' })).toBeVisible()
  await page.getByLabel('Tìm trong Cẩm nang').fill('Kỹ năng')
  await page.getByRole('button', { name: 'Tìm kiếm' }).click()
  await expect(page.getByRole('heading', { name: 'Kỹ năng xử lý tình huống' })).toBeVisible()
  await page.getByRole('link', { name: 'Xem bài' }).click()
  await expect(page).toHaveURL(/\/handbook\/ky-nang-tinh-huong$/)
  await expect(page.getByRole('heading', { name: 'Kỹ năng xử lý tình huống' })).toBeVisible()
  await page.getByRole('link', { name: 'Quay lại danh sách' }).click()
  await expect(page).toHaveURL(/\/handbook$/)
  await expectNoGlobalOverflow(page)
})

test('E2E-P0-UI-003 [QUIZ-005..QUIZ-008] Quiz list → attempt → answer → submit → result', async ({ page }) => {
  await loginToHome(page)
  await page.getByTestId('module-card').filter({ hasText: 'Kiểm tra trắc nghiệm' }).click()
  await expect(page.getByRole('heading', { name: 'Danh sách kỳ kiểm tra' })).toBeVisible()
  await page.getByRole('button', { name: 'Bắt đầu', exact: true }).first().click()
  await page.getByRole('button', { name: 'Bắt đầu mock' }).click()
  await expect(page.getByRole('heading', { name: 'Làm bài kiểm tra' })).toBeVisible()
  await page.getByRole('radio', { name: /Phương án mẫu A/ }).check()
  await page.getByRole('button', { name: 'Nộp bài' }).click()
  await page.getByRole('button', { name: 'Xác nhận nộp mock' }).click()
  await expect(page.getByRole('heading', { name: 'Kết quả kiểm tra' })).toBeVisible()
  await expect(page.getByLabel('Kết quả ĐẠT')).toBeVisible()
  await expect(page.getByText(/Không raw score/)).toBeVisible()
  await expectNoGlobalOverflow(page)
})

test('E2E-P0-UI-004 [COMP-001, COMP-002, COMP-005, COMP-006] Home → Competition ranking', async ({ page }) => {
  await loginToHome(page)
  await page.getByTestId('module-card').filter({ hasText: 'Chấm điểm thi đua' }).click()
  await expect(page.getByRole('heading', { name: 'Bảng xếp hạng' })).toBeVisible()
  await expect(page.getByTestId('ranking-mock-warning')).toContainText('OI-002/OI-012/OI-014')
  await expect(page.getByRole('table')).toBeVisible()
  await page.getByLabel('Phạm vi').selectOption('Đại đội')
  await expect(page.getByText(/Đại đội/).last()).toBeVisible()
  await expectNoGlobalOverflow(page)
})

test('E2E-P0-UI-005 [QUIZ-001..QUIZ-003] Admin Dashboard → Question Bank → local create/edit UI → back', async ({ page }) => {
  await page.goto('/admin')
  await page.getByRole('button', { name: 'Thử tải lại widget (mock)' }).click()
  await expect(page.getByText('Đã thử tải lại cục bộ; metric vẫn là placeholder chờ OI-013.')).toBeVisible()
  await page.getByRole('link', { name: /Mở Ngân hàng câu hỏi/ }).click()
  await expect(page.getByRole('heading', { name: 'Ngân hàng câu hỏi' })).toBeVisible()
  await page.getByRole('button', { name: '+ Thêm câu hỏi' }).click()
  await page.getByLabel('Nội dung câu hỏi').fill('Câu hỏi local từ Playwright?')
  await page.getByLabel('Loại câu hỏi').selectOption('Đúng/Sai')
  await page.getByRole('button', { name: 'Lưu mock' }).click()
  await expect(page.getByRole('cell', { name: 'Câu hỏi local từ Playwright?' })).toBeVisible()
  await page.getByRole('button', { name: 'Sửa' }).first().click()
  await expect(page.getByText('Sửa câu hỏi — local mock')).toBeVisible()
  await page.getByRole('button', { name: 'Hủy' }).click()
  await page.getByRole('link', { name: 'Về Dashboard' }).click()
  await expect(page).toHaveURL(/\/admin$/)
  await expectNoGlobalOverflow(page)
})

test('E2E-P0-UI-006 [HAN-001..HAN-003, FILE-001] Admin Dashboard → Handbook → local create/edit UI', async ({ page }) => {
  await page.goto('/admin')
  await page.getByRole('link', { name: /Mở Quản lý Cẩm nang/ }).click()
  await expect(page.getByRole('heading', { name: 'Quản lý Cẩm nang' })).toBeVisible()
  await page.getByRole('button', { name: '+ Thêm bài' }).click()
  await page.getByLabel('Tiêu đề').fill('Bài Cẩm nang local từ Playwright')
  await page.getByLabel('Nội dung').fill('Nội dung mock cục bộ.')
  await page.getByRole('button', { name: 'Lưu mock' }).click()
  await expect(page.getByText('Bài Cẩm nang local từ Playwright')).toBeVisible()
  await page.getByRole('button', { name: 'Sửa' }).first().click()
  await expect(page.getByText('Sửa bài Cẩm nang — local mock')).toBeVisible()
  await page.getByRole('button', { name: 'Hủy' }).click()
  await expectNoGlobalOverflow(page)
})
