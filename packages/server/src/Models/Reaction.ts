import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table, Unique } from 'sequelize-typescript';
import { ForumTopic } from './ForumTopic';
import { User } from './User';

@Table
export class Reaction extends Model<InferAttributes<Reaction>, InferCreationAttributes<Reaction>> {
    
    @AllowNull(false)
    @Column(DataType.STRING)
    declare Type: string

    @AllowNull(false)
    @Column(DataType.DATE)
    declare createdAt: Date;

    @BelongsTo(() => User)
    declare User: User
    
    @ForeignKey(() => User)
    @Unique
    @Column
    declare UserId: number;
    
    @BelongsTo(() => ForumTopic)
    declare ForumTopic: ForumTopic

    @ForeignKey(() => ForumTopic)
    @Unique
    @Column
    declare TopicId: number;
}
