import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('api/customers')
export class CustomersController {}
