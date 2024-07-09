import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRequestProductSampleDto {
    @IsNotEmpty()
    @IsString()
    description: string

    @IsNumber()
    authorId: number

    @IsArray()
    productSampleIds: number[]

    @IsDate()
    createAt: Date
}
