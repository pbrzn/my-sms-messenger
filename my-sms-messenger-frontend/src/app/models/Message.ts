export class Message {
  body!: string;
  from!: string;
  sessionId!: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}