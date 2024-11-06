import { Module } from '@nestjs/common';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entity';

@Module({
    imports: [TypeOrmModule.forFeature([Branch])],
    controllers: [BranchesController],
    providers: [BranchesService],
    exports: [BranchesService]
})
export class BranchesModule {}
