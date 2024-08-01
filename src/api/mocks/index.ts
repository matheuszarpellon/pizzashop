import { setupWorker } from 'msw/browser'

import { env } from '@/env'
import { signInMock } from './sign-in-mock'
import { registerRestaurantMock } from './register-restaurant-mock'

export const worker = setupWorker(signInMock, registerRestaurantMock)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}