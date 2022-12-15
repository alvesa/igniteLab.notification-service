import { Notification } from '../../application/entities/notification';
import { Content } from '../entities/content/content';
import { InMemoryNotificationRepository } from './../../../test/repostories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

// TODO: paths

describe('Cancel notifications', () => {
  it('should be able to cancel notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      content: new Content('This is a notification'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].cancelledAt).toEqual(
      expect.any(Date),
    );
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
