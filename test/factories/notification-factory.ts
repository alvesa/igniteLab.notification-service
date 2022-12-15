import {
  Notification,
  NotificationProps,
} from './../../src/application/entities/notification';
import { Content } from './../../src/application/entities/content/content';

type Override = Partial<NotificationProps>;

// TODO: paths
export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('This is a notification'),
    category: 'social',
    recipientId: 'example-recipient-id-1',
    ...override,
  });
}
