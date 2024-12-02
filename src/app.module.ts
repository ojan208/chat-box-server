import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './resources/chats/chats.module';
import { MessagesModule } from './resources/messages/messages.module';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './resources/auth/auth.guard';
import { PrismaService } from './resources/prisma.service';

@Module({
  imports: [
    ChatsModule, 
    MessagesModule, 
    AuthModule, 
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
