import { UnreadNotification } from './../../application/use-cases/unread-notification';
import { ReadNotification } from './../../application/use-cases/read-notification';
import { GetRecipientNotifications } from './../../application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from './../../application/use-cases/count-recipient-notifications';
import { CancelNotification } from './../../application/use-cases/cancel-notification';
import { SendNotification } from './../../application/use-cases/send-notification';
import { NotificationsController } from './controllers/notification.controller';
import { Module } from '@nestjs/common';
import DatabaseModule from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
