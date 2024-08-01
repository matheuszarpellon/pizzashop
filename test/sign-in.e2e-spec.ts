import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('E-mail').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Entrar' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para o seu e-mail.',
  )

  expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('E-mail').fill('wrong@example.com')
  await page.getByRole('button', { name: 'Entrar' }).click()

  const toast = page.getByText('Ocorreu um erro ao enviar o link de autenticação.')

  expect(toast).toBeVisible()
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})