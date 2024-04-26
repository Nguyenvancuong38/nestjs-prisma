import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CreateRequestDetailDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    @IsOptional()
    image: string

    @IsOptional()
    file: string

    @IsNotEmpty()
    toEmail: string

    @IsOptional()
    ccEmail: string

    @IsNotEmpty()
    requestId: number

    @IsDate()
    updateAt: Date

    @IsNotEmpty()
    isSendEmail: boolean

    @IsNotEmpty()
    authorId: number
}
