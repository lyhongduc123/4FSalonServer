import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class SpecificOffDaysDTO {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    employee_id: number;

    @ApiProperty({ example: '' })
    @IsDateString()
    @IsNotEmpty()
    date: Date;
}

export class UpdateSpecificOffDaysDTO extends PartialType(SpecificOffDaysDTO) {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;
}