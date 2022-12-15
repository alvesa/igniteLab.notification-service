import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helper/Replace';
import { Content } from './content/content';
export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  createdAt: Date;
  readAt?: Date | null;
  cancelledAt?: Date | null;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public cancel() {
    this.props.cancelledAt = new Date();
  }

  public get cancelledAt(): Date | null | undefined {
    return this.props.cancelledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
