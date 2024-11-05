import { ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty, 
    IsNumber, 
    IsOptional
} from 'class-validator';

export class CreateEmployeeDTO {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiProperty({ example: 'PC01' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'email@gmail.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '0912487918' })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ example: 'stylist' })
    @IsString()
    @IsNotEmpty()
    work_position: string;

    @ApiProperty({ example: 'Monday' })
    @IsString()
    @IsNotEmpty()
    available_from: string;

    @ApiProperty({ example: 'Sunday' })
    @IsString()
    @IsNotEmpty()
    available_to: string;

    @ApiProperty({ example: true, description: 'true = working, false = not working' })
    @IsNotEmpty()
    status: boolean;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    branch_id: number;
}

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {}

export class QueryEmployeeDTO {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    work_position?: string;
    available_from?: string;
    available_to?: string;
    status?: boolean;
    branch_id?: number;
}