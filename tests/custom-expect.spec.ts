import { test } from '@playwright/test';
import { expect } from '../fixtures/custom-expect';

export interface ActivitiesResponse {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

test('Custom expect test', async ({ request }) => {
  const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Activities');
  const responseBody: ActivitiesResponse[] = await response.json();

  expect(responseBody[1]).toValidateActivitiesResponse({
    id: 2,
    completed: true,
    dueDate: '2025-06-01',
    title: 'Activity 2',
  });
  expect(responseBody[0]).toValidateActivitiesResponse({
    id: 1,
    completed: false,
    dueDate: '2025-06-01',
    title: 'Activity 1',
  });
});
