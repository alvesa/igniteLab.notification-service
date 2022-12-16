import { Notification as RawNotification } from '@prisma/client';
import { Content } from 'src/application/entities/content/content';
import { Notification } from '../../../../application/entities/notification';
// TODO: path
export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        cancelledAt: raw.cancelledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
