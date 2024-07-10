import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRequestProductSampleDto {
    @ApiProperty({
        example: 'Borrow HDT565 sample'
    })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({
        example: 5
    })
    @IsNumber()
    authorId: number

    @ApiProperty({
        example: [1, 2, 3]
    })
    @IsArray()
    productSampleIds: number[]

    @ApiProperty({
        example: '2024/07/10'
    })
    @IsDate()
    createAt: Date
}
