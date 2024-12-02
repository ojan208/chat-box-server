import { Module } from '@nestjs/common';
import ChatsService from './chats.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [
    ChatsService,
    PrismaService,
  ]
})
export class ChatsModule {}
