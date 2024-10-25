import { Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard, RolesGuard, Roles } from './../../common';
import { CreateServiceDTO, UpdateServiceDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Services')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/services')
export class ServicesController {
    constructor(private servicesService: ServicesService) {}

    @Get()
    async findAll(): Promise<any[]> {
        return await this.servicesService.findAll();
    }

    @Roles('admin')
    @Get(':id')
    async findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
            ) 
        id: number
    ): Promise<any> {
        return await this.servicesService.findOne(id);
    }

    @Roles('admin')
    @Get('find')
    async findBy(where: any): Promise<any[]> {
        return await this.servicesService.findBy(where);
    }

    @Roles('admin')
    @Post('create')
    async create(service: CreateServiceDTO): Promise<any> {
        return await this.servicesService.create(service);
    }

    @Roles('admin')
    @Put('update')
    async update(service: UpdateServiceDTO): Promise<any> {
        return await this.servicesService.update(service);
    }

    @Roles('admin')
    @Delete(':id')
    async remove(id: number): Promise<any> {
        return await this.servicesService.remove(id);
    }
}
