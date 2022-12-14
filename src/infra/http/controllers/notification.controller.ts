import { SendNotification } from '../../../application/use-cases/send-notification';
import { CreateNotificationDto } from '../dtos/create-notification-dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}
  @Post()
  async create(@Body() body: CreateNotificationDto) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
