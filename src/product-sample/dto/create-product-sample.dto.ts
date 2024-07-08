import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductType } from "src/enums/role.enum";

export class CreateProductSampleDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    partNo: string

    @IsOptional()
    description: string

    @IsOptional()
    dateStart: Date

    @IsOptional()
    dateEnd: Date

    @IsEnum(ProductType)
    type: ProductType

    @IsNumber()
    userId: number

    @IsNumber()
    modelId: number
}
