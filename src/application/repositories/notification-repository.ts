import { Notification } from './../entities/notification';
export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientById(recipientId: string): Promise<number>;
  abstract findManyByrecipientId(recipientId: string): Promise<Notification[]>;
}
