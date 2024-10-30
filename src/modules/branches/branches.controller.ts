import { Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Delete, UseGuards, Body } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { JwtAuthGuard, Roles, RolesGuard } from './../../common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
    @Roles('admin')
    @Post()
    @ApiOperation({
        summary: 'Create a branch',
        description: 'Create a branch in the database'
    })
    @ApiBearerAuth('JWT-auth')
    async create(@Body() branch: CreateBranchDTO): Promise<any> {
        return await this.branchesService.create(branch);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put('id')
    @ApiOperation({
        summary: 'Update a branch',
        description: 'Update a branch in the database'
    })
    @ApiBearerAuth('JWT-auth')
    async update(@Body() branch: UpdateBranchDTO): Promise<any> {
        return await this.branchesService.update(branch);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a branch',
        description: 'Delete a branch from the database'
    })
    @ApiBearerAuth('JWT-auth')
    async remove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
        return await this.branchesService.remove(id);
    }
}
