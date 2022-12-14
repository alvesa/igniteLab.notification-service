import { SendNotification } from './../../application/use-cases/send-notification';
import { NotificationsController } from './controllers/notification.controller';
import { Module } from '@nestjs/common';
import DatabaseModule from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
