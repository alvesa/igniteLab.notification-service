import { CountRecipientNotifications } from './../../../application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from './../../../application/use-cases/get-recipient-notifications';
import { ReadNotification } from './../../../application/use-cases/read-notification';
import { CancelNotification } from './../../../application/use-cases/cancel-notification';
import { NotificationViewModel } from './../view-models/notification-view-model';
import { SendNotification } from '../../../application/use-cases/send-notification';
import { CreateNotificationDto } from '../dtos/create-notification-dto';
import { Body, Controller, Patch, Post } from '@nestjs/common';
import { Get, Param, Query } from '@nestjs/common/decorators';
import { UnreadNotification } from '../../../application/use-cases/unread-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotification: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(
    @Query('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('/from/:recipientId')
  async getFromRecipient(@Query('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationDto) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
