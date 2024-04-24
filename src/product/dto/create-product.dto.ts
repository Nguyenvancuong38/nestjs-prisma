import { IsDate, IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string

    @IsDate()
    updateAt: Date
}
