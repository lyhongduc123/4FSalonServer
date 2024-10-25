import { ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty, 
    IsNumber 
} from 'class-validator';

export class CreateEmployeeDTO {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    position: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    branch_id: number;
}

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {}