import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductType } from "src/enums/role.enum";

export class CreateProductSampleDto {
    @ApiProperty({
        example: 'HDT565'
    })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({
        example: '85X123456789'
    })
    @IsOptional()
    partNo: string

    @ApiProperty({
        example: 'description'
    })
    @IsOptional()
    description: string

    @ApiProperty({
        example: '2024/07/10'
    })
    @IsOptional()
    dateStart: Date

    @ApiProperty({
        example: '2024/08/10'
    })
    @IsOptional()
    dateEnd: Date

    @ApiProperty({
        example: 'standard'
    })
    @IsEnum(ProductType)
    type: ProductType

    @ApiProperty({
        example: 5
    })
    @IsNumber()
    userId: number

    @ApiProperty({
        example: 1
    })
    @IsNumber()
    modelId: number

    @ApiProperty({
        example: 1
    })
    @IsNumber()
    productSampleWithUserId: number
}
