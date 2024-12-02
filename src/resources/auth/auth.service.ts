import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { ResponseError, ResponseSuccess } from 'src/utils/response';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async singUp(data: SignUpDTO) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10)

            const user = await this.userService.create({
                email: data.email,
                username: data.username,
                password: hashedPassword
            })

            const { password, ...userData } = user

            return {
                status: 200,
                data: userData
            }
        } catch (error) {
            if (error.code === "p2002") {
                return {
                    status: 409,
                    data: new Error("Email or Username Already In Use ")
                }
            }
            return {
                status: 500,
                data: error
            }
        }
    }
    async signIn(data: SignInDTO) {
        try {
            const user = await this.userService.getByEmail(data.email)

            if (!user) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: new Error("Email or Password is Wrong")
                }
            }

            const { password, id, ...userData } = user
            const isMatch = await bcrypt.compare(data.password, password)

            if(!isMatch) {
                return {
                    status: 400,
                    data: new Error("Email or Password is Wrong")
                }
            }

            const payload = userData
            return {
                status: 200,
                data: {
                    access_token: await this.jwtService.signAsync(payload)
                }
            }
        } catch (error) {
            return {
                status: 500,
                data: error
            }
        }
    }
}