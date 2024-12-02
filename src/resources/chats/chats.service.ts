import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export default class ChatsService {
    constructor(protected prisma: PrismaService) {}

    async save(first_user_id: string, second_user_id: string) {
        const existingChat = await this.prisma['chat'].findFirst({
            select: {
                id: true
            },
            where: {
                OR: [
                    { user_one: first_user_id, user_two: second_user_id },
                    { user_one: second_user_id, user_two: first_user_id }
                ]
            }
        })

        if (!!existingChat) {
            return existingChat
        }

        const newchat = await this.prisma['chat'].create({
            data: {
                user_one: first_user_id,
                user_two: second_user_id
            }
        })

        return newchat.id
    }
}
