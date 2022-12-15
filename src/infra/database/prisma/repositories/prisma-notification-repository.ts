import { PrismaNotificationMapper } from './../mappers/prisma-notification-mapper';
import { Injectable } from '@nestjs/common';
import { Notification } from './../../../../application/entities/notification';
import { NotificationRepository } from 'src/application/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
// TODO: paths
@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
