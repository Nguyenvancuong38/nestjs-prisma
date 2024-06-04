import { IsArray, IsNotEmpty } from "class-validator";

export class CreateTypeDto {
    @IsNotEmpty()
    name: string

    @IsArray()
    topics: number[]
}
