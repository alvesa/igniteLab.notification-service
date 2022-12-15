import { GetRecipientNotifications } from './get-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from './../../../test/repostories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { NotificationNotFound } from './errors/notification-not-found';

// TODO: paths

describe('Recipients notifications', () => {
  it('should be able to count the recipient"s notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new GetRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id-2' }),
    );

    const { notifications } = await countRecipientNotification.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id-1' }),
        expect.objectContaining({ recipientId: 'example-recipient-id-1' }),
      ]),
    );
  });
});
