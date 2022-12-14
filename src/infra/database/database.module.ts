import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';
import { NotificationRepository } from 'src/application/repositories/notification-repository';
import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export default class DatabaseModule {}
