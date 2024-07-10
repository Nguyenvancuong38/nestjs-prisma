import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @ApiProperty({
        example: '91205250'
    })
    @IsNotEmpty()
    @IsString()
    code: string 

    @ApiProperty({
        example: '91205250'
    })
    @IsNotEmpty()
    @IsString()
    password: string
}