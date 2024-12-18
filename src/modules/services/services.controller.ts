import { Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards, Body, BadRequestException } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard, RolesGuard, Roles } from './../../common';
import { CreateServiceDTO, UpdateServiceDTO } from './dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    @Roles('admin', 'manager')
    @Post()
    @ApiOperation({
        summary: 'Create service',
        description: 'Create a service in the database'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Service has been created' })
    @ApiConflictResponse({ description: 'Service already exists' })
    async create(@Body() createServiceDTO: CreateServiceDTO): Promise<any> {
        return await this.servicesService.create(createServiceDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Put(':id')
    @ApiOperation({
        summary: 'Update service',
        description: 'Update a service in the database'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'Return updated service' })
    @ApiBadRequestResponse({ description: 'Missing service id' })
    @ApiNotFoundResponse({ description: 'Service not found' })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateServiceDTO: UpdateServiceDTO
    ): Promise<any> {
        updateServiceDTO.id = id;
        return await this.servicesService.update(updateServiceDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete service',
        description: 'Delete a service in the database'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'Service has been deleted' })
    @ApiBadRequestResponse({ description: 'Missing service id' })
    async remove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
        if (!id) throw new BadRequestException('Missing service id');
        return await this.servicesService.remove(id);
    }
}
