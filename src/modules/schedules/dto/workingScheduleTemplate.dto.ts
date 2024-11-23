import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class WorkingScheduleTemplateDTO {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    employee_id: number;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    monday: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    tuesday: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    wednesday: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    thursday: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    friday: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    saturday: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    sunday: boolean;
}

export class UpdateWorkingScheduleTemplateDTO extends PartialType(WorkingScheduleTemplateDTO) {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;
}