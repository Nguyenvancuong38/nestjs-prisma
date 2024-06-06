import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateTopicDto {
    @IsNotEmpty()
    title: string 

    @IsNotEmpty()
    content: string

    @IsOptional()
    image: string

    @IsNumber()
    productId: number

    @IsDate()
    updateAt: Date

    @IsArray()
    types: number[]
}
