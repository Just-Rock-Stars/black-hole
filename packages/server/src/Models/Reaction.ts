import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
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
    @Column
    declare UserId: number;
    
    @BelongsTo(() => ForumTopic)
    declare ForumTopic: ForumTopic

    @ForeignKey(() => ForumTopic)
    @Column
    declare TopicId: number;
}
