import { Injectable } from '@nestjs/common';
import { Notification } from './../../../../application/entities/notification';
import { NotificationRepository } from 'src/application/repositories/notification-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    console.log(notification);
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
      },
    });
  }
}
