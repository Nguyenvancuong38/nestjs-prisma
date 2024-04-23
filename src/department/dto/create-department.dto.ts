import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    description: string
}
