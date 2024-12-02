import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { ResponseError, ResponseSuccess } from 'src/utils/response';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    @Public()
    async register(@Body() req: SignUpDTO) {
        try {
            const user = await this.authService.singUp(req)

            if (user.status !== 200) {
                return ResponseError(user.data, user.status)
            }

            return ResponseSuccess(user.data, "Your Account Has Been Created", 201)
        } catch (error) {
            return ResponseError(error)
        }
    }

    @Post('/login')
    @Public()
    async login(@Body() req: SignInDTO) {
        try {
            const user = await this.authService.signIn(req)

            if (user.status !== 200) {
                return ResponseError(user.data, user.status)
            }

            return ResponseSuccess(user.data, "Login Successful", user.status)
        } catch (error) {
            return ResponseError(error)
        }
    }
}
