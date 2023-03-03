import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { RealEstate } from './realEstate.entity'
import { User } from './user.entity'

@Entity('schedules')
class Schedule {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'date' })
    date: Date

    @Column({ type: 'time' })
    hour: Date

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => RealEstate)
    realEstate: RealEstate
}

export { Schedule }
