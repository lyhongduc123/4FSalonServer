import { Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards, Body } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard, RolesGuard, Roles } from './../../common';
import { CreateServiceDTO, UpdateServiceDTO } from './dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Services')
@Controller('api/services')
export class ServicesController {
    constructor(private servicesService: ServicesService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all services',
        description: 'Get all services from the database'
    })
    async findAll(): Promise<any[]> {
        return await this.servicesService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get service by id',
        description: 'Get a service by id from the database'
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.servicesService.findOne(id);
    }

    @Get('search')
    @ApiOperation({
        summary: 'Get list of services by search',
        description: 'Get a list of services by search from the database'
    })
    async findBy(@Body() where: UpdateServiceDTO): Promise<any[]> {
        return await this.servicesService.findBy(where);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    @ApiOperation({
        summary: 'Create service',
        description: 'Create a service in the database'
    })
    @ApiBearerAuth('JWT-auth')
    async create(@Body() createServiceDTO: CreateServiceDTO): Promise<any> {
        return await this.servicesService.create(createServiceDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id')
    @ApiOperation({
        summary: 'Update service',
        description: 'Update a service in the database'
    })
    @ApiBearerAuth('JWT-auth')
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateServiceDTO: UpdateServiceDTO
    ): Promise<any> {
        updateServiceDTO.id = id;
        return await this.servicesService.update(updateServiceDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete service',
        description: 'Delete a service in the database'
    })
    @ApiBearerAuth('JWT-auth')
    async remove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
        return await this.servicesService.remove(id);
    }
}
