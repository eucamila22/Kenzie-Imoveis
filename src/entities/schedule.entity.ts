import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { RealEstate } from './realEstate.entity'
import { User } from './user.entity'

@Entity('schedules_users_properties')
class Schedule {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'date' })
    date: Date

    @Column({ type: 'time' })
    hour: Date

    @ManyToOne(() => RealEstate, (realEstate) => realEstate.schedules)
    @JoinColumn()
    realEstate: RealEstate

    @ManyToOne(() => User, (user) => user.schedules)
    @JoinColumn()
    user: User
}

export { Schedule }
