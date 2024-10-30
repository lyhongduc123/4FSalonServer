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

    @ApiProperty()
    @IsNumber()
    user_id?: number;
}

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;
}

export class CreateEmployeeUserDTO extends CreateEmployeeDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    role: string;
}