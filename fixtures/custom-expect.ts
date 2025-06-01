import { expect as base } from '@playwright/test';
import { ActivitiesResponse } from '../models';

type ResponseType = ActivitiesResponse | ActivitiesResponse[];

export const expect = base.extend({
  toValidateActivitiesResponse(
    received: ResponseType,
    options: {
      id?: number;
      title?: string;
      dueDate?: string;
      completed?: boolean;
    },
    position?: number,
  ) {
    const validate = (item: ActivitiesResponse) => {
      if (!options) {
        return {
          pass: false,
          message: () => 'Enter properties to compassion',
        };
      }
      expect(item.id, 'Id does not match, possibly undefined or null').toBe(options.id);
      expect(item.title).toContain(options.title);
      expect(item.dueDate).toContain(options.dueDate);

      if (options.completed !== true) {
        expect(item.completed, `Completed to equal: ${item.completed}`).toBeFalsy();
      } else {
        expect(item.completed, `Completed to equal: ${item.completed}`).toBeTruthy();
      }

      return {
        pass: true,
        message: () => 'ActivitiesResponse is successful!',
      };
    };

    if (received && typeof received === 'object' && 'id' in received) {
      return validate(received as ActivitiesResponse);
    }

    if (Array.isArray(received) && received) {
      if (position || position === 0) {
        return validate(received[position] as ActivitiesResponse);
      } else {
        return {
          pass: false,
          message: () => 'Invalid or missing position argument for array response',
        };
      }
    }

    return {
      pass: false,
      message: () => 'Response does not match expected structure',
    };
  },
});
