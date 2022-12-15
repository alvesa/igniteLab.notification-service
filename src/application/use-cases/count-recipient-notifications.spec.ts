import { Notification } from '../../application/entities/notification';
import { Content } from '../entities/content/content';
import { InMemoryNotificationRepository } from './../../../test/repostories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { NotificationNotFound } from './errors/notification-not-found';

// TODO: paths

describe('Count recipients notifications', () => {
  it('should be able to count the recipient"s notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      new Notification({
        content: new Content('This is a notification'),
        category: 'social',
        recipientId: 'example-recipient-id-1',
      }),
    );

    await notificationRepository.create(
      new Notification({
        content: new Content('This is a notification'),
        category: 'social',
        recipientId: 'example-recipient-id-1',
      }),
    );

    await notificationRepository.create(
      new Notification({
        content: new Content('This is a notification'),
        category: 'social',
        recipientId: 'example-recipient-id-2',
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(count).toEqual(2);
  });

  it('should not be able to cancel an non existing notification', () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
