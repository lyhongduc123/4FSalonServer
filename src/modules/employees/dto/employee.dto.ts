import { ApiProperty, ApiQuery, ApiTags, PartialType } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty, 
    IsNumber, 
    IsOptional
} from 'class-validator';
import { IQuery } from 'src/interfaces/query.interface';
import { Customer } from 'src/modules/customers/entity';
import { Employee } from '../entity';

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
    
    @ApiProperty({ required: false })
    @IsNotEmpty()
    big_avatar_url?: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    small_avatar_url?: string;

    @ApiProperty({ example: true, description: 'true = working, false = not working' })
    @IsNotEmpty()
    status: boolean;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    branch_id: number;
}

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {}


class EmployeeDTO {
    @ApiProperty({ required: false })
    id?: number;

    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    email?: string;

    @ApiProperty({ required: false })
    phone?: string;

    @ApiProperty({ required: false })
    work_position?: string;

    @ApiProperty({ required: false })
    available_from?: string;

    @ApiProperty({ required: false})
    available_to?: string;

    @ApiProperty({ description: 'true = working, false = not working', required: false })
    status?: boolean;

    @ApiProperty({ required: false })
    overall_rating?: number;

    @ApiProperty({ required: false })
    big_avatar_url?: string;

    @ApiProperty({ required: false })
    small_avatar_url?: string;

    @ApiProperty({required: false })
    branch_id?: number;

    @ApiProperty({required: false })
    created_at?: number;

    @ApiProperty({required: false })
    updated_at?: number;
}

export class QueryEmployeeDTO implements IQuery {
    @ApiProperty({ required: false })
    select?: string;

    @ApiProperty({ required: false })
    relations?: boolean;

    @ApiProperty({ required: false })
    where?: EmployeeDTO;

    @ApiProperty({ required: false })
    skip?: number;

    @ApiProperty({ required: false })
    page?: number;

    @ApiProperty({ required: false })
    checkWorkingSchedule?: boolean;
}