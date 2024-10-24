import { 
    IsString, 
    IsNotEmpty, 
    IsNumber 
} from 'class-validator';

export class CreateEmployeeDTO {
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    position: string;

    @IsNumber()
    @IsNotEmpty()
    branch_id: number;
}