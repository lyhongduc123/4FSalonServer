import { Voucher } from "src/modules/vouchers/entity";
import { Customer } from "src/modules/customers/entity";
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
    DeleteDateColumn,
    PrimaryColumn
} from "typeorm";

@Entity('voucher_history', { engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class VoucherHistory {
    
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    customer_id: number;


    @Column()
    voucher_id: number;

    @ManyToOne(() => Customer, (customer) => customer.id)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Voucher, (voucher) => voucher.id)
    @JoinColumn({ name: 'voucher_id' })
    voucher: Voucher;

    @UpdateDateColumn()
    updated_at: Date;

    
    @CreateDateColumn()
    created_at: Date;
}