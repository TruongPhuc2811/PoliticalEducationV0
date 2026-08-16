import { expect, test } from '@playwright/test'

test('SHELL-001 login shell navigates to the 9-module home', async ({ page }) => {
  await page.goto('/login')

  await expect(
    page.getByRole('heading', { name: 'Đăng nhập' }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Đăng nhập' }).click()

  await expect(page).toHaveURL(/\/home$/)
  await expect(page.getByTestId('module-card')).toHaveCount(9)
})

test('SHELL-002 admin shell is reachable', async ({ page }) => {
  await page.goto('/admin')
  await expect(
    page.getByRole('heading', { name: 'Admin Dashboard' }),
  ).toBeVisible()
})
