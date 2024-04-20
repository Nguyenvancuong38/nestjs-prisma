import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Role } from "src/enums/role.enum"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    userName: string
    
    @IsNotEmpty()
    @IsEmail()
    email: string 
    
    @IsNotEmpty()
    @IsString()
    code: string
    
    @IsNotEmpty()
    @IsString()
    password: string 

    @IsEnum(Role)
    role: Role
}
