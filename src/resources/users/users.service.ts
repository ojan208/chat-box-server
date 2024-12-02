import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
    constructor(protected prisma: PrismaService) {}

    async create(data: { email: string, username:string, password: string}) {
        console.log(data.password);
        
        return this.prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: data.password
            }
        })
    }

    async getByEmail(email: string) {
        return this.prisma.user.findFirst({
            where: {
                email: email
            }
        })
    }
}
