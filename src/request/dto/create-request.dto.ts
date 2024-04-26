import { IsArray, IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CreateRequestDto {
    @IsNotEmpty()
    title: string

    @IsOptional()
    description: string

    @IsDate()
    updateAt: Date

    @IsNotEmpty()
    authorId: number

    @IsNotEmpty()
    productId: number
}
