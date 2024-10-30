import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
     IsString, 
     IsNotEmpty,
     IsBoolean} from 'class-validator';

export class CreateBranchDTO {
    @ApiProperty({ example: 'So 10 Le Van Luong' })
    @IsString()
    name: string;

    @ApiProperty({ example: '10 Le Van Luong, Thanh Xuan, Ha Noi' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: '0912487918' })
    @IsString()
    phone: string;

    @ApiProperty({ example: 'brancha@mail.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'pending' })
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}

export class UpdateBranchDTO extends PartialType(CreateBranchDTO) {}