import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
     IsString, 
     IsNotEmpty,
     IsBoolean,
     IsOptional,
     IsNumber} from 'class-validator';

export class CreateBranchDTO {
    @ApiProperty({ example: 'PC02' })
    @IsString()
    name: string;

    @ApiProperty({ example: '7 P. Thiền Quang, Nguyễn Du, Hai Bà Trưng, Hà Nội' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: '0936860001' })
    @IsString()
    phone: string;

    @ApiProperty({ example: 'brancha@mail.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'true' })
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    picture_url: string;
}

export class UpdateBranchDTO extends PartialType(CreateBranchDTO) {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    id?: number;
}