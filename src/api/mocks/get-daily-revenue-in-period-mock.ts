import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    { date: '01/07/2024', receipt: 2000 },
    { date: '02/07/2024', receipt: 800 },
    { date: '03/07/2024', receipt: 8000 },
    { date: '04/07/2024', receipt: 540 },
    { date: '05/07/2024', receipt: 400 },
    { date: '06/07/2024', receipt: 700 },
    { date: '07/07/2024', receipt: 1000 },
  ])
})