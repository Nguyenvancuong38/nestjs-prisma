import { IsNotEmpty, IsOptional, IsNumber, IsDate } from "class-validator"

export class CreateTopicSubDto {
    @IsNotEmpty()
    content: string

    @IsOptional()
    image: string

    @IsNumber()
    topicId: number

    @IsDate()
    updateAt: Date
}
