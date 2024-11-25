import { Module } from '@nestjs/common';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Branch]),
        UsersModule
    ],
    controllers: [BranchesController],
    providers: [BranchesService],
    exports: [BranchesService]
})
export class BranchesModule {}
