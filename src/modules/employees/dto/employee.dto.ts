import { ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty, 
    IsNumber, 
    IsOptional
} from 'class-validator';

export class CreateEmployeeDTO {
    @ApiProperty({ example: 'John Doe' })
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

    @ApiProperty({ example: '10 Le Van Luong, Thanh Xuan, Ha Noi' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: 'stylist' })
    @IsString()
    @IsNotEmpty()
    position: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    branch_id: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    user_id?: number;
}

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id: number;
}

export class CreateEmployeeUserDTO extends CreateEmployeeDTO {
    @ApiProperty({ example: 'password' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'admin' })
    @IsString()
    @IsNotEmpty()
    role: string;
}