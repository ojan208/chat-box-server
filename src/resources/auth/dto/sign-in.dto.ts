import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"

export class SignInDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}