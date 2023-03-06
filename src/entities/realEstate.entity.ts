import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import { Address } from './address.entity'
import { Category } from './category.entity'

@Entity('real_estates')
class RealEstate {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'boolean', default: false })
    sold: boolean

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    value: number | string

    @Column({ type: 'integer' })
    size: number

    @CreateDateColumn({ type: 'date' })
    createdAt: string

    @UpdateDateColumn({ type: 'date' })
    updatedAt: string

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @ManyToOne(() => Category, (category) => category.realEstate)
    @JoinColumn()
    category: Category
}

export { RealEstate }
