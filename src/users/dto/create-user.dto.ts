import { IsArray, IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Role } from "src/enums/role.enum"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string
    
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

    @IsNotEmpty()
    departmentId: number

    @IsDate()
    createAt: Date

    @IsDate()
    updateAt: Date

    @IsArray()
    productIds: number[]
}
