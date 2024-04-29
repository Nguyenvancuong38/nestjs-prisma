import { IsNotEmpty, IsOptional, IsNumber, IsDate } from "class-validator"

export class CreateTopicSubDto {
    @IsNotEmpty()
    title: string 

    @IsNotEmpty()
    content: string

    @IsOptional()
    image: string

    @IsOptional()
    authorId: number

    @IsNumber()
    productId: number

    @IsNumber()
    topicId: number

    @IsDate()
    updateAt: Date
}
