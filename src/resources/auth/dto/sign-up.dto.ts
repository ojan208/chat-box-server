import { IsEmail, IsNotEmpty, IsString, Matches, minLength, MinLength } from "class-validator"

export class SignUpDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(4, {
        message: "Username Too Short"
    })
    username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {
        message: "password too weak"
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string
}