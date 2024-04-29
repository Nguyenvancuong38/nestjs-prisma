import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateTopicDto {
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

    @IsDate()
    updateAt: Date
}
