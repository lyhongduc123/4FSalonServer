import { Branch } from "src/modules/branches/entity";
import { 
    Column,
    CreateDateColumn,
    Entity, 
    JoinColumn, 
    ManyToOne, 
    ManyToMany, 
    JoinTable, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn, 
    RelationId,
    OneToOne,
    DeleteDateColumn
} from "typeorm";


@Entity('vouchers')
export class Voucher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: ['percentage', 'fixed'],
        default: 'percentage'
    })
    discount_type: string;

    @Column()
    discount_value: number;

    @Column()
    price_threshold: number;

    @Column()
    required_point: number;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;


    @Column()
    branch_id: number;


    @ManyToMany(() => Branch, (branch) => branch.vouchers, {nullable: true})
    @JoinColumn({name: 'branch_id'})
    branches: Branch[];

    @CreateDateColumn()
    created_at: Date;
}