import { Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Delete, UseGuards, Body, Req, BadRequestException } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { JwtAuthGuard, Roles, RolesGuard } from './../../common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBranchDTO, UpdateBranchDTO } from './dto';

@ApiTags('Branches')
@Controller('api/branches')
export class BranchesController {
    constructor(private branchesService: BranchesService) {}

    @Get()
    @ApiOperation({ 
        summary: 'Get all branches', 
        description: 'Get all branches from the database'
    })
    async findAll(): Promise<any[]> {
        return await this.branchesService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get a branch',
        description: 'Get a branch from the database'
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.branchesService.findOne(id);
    }

    @Get('search')
    @ApiOperation({
        summary: 'Search branches',
        description: 'Search branches in the database'
    })
    async findBy(where: any): Promise<any[]> {
        return await this.branchesService.findBy(where);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Post()
    @ApiOperation({
        summary: 'Create a branch',
        description: 'Create a branch in the database'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Branch has been created' })
    @ApiConflictResponse({ description: 'Branch already exists' })
    async create(@Body() branch: CreateBranchDTO): Promise<any> {
        const res = await this.branchesService.create(branch);
        return res;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Put(':id')
    @ApiOperation({
        summary: 'Update a branch',
        description: 'Update a branch in the database'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Branch has been updated' })
    @ApiBadRequestResponse({ description: 'Branch id is required' })
    @ApiNotFoundResponse({ description: 'Branch not found' })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() branch: UpdateBranchDTO
    ): Promise<any> {
        branch.id = id;
        return await this.branchesService.update(branch);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a branch',
        description: 'Delete a branch from the database'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'Branch has been deleted' })
    async remove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
        await this.branchesService.remove(id);
        return { message: 'Branch has been deleted' };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a branch',
        description: 'Delete a branch from the database'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'Branch has been deleted' })
    async delete(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
        await this.branchesService.delete(id);
        return { message: 'Branch has been deleted' };
    }
}
