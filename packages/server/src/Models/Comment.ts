import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { ForumTopic } from './ForumTopic';
import { Reply } from './Reply';
import { User } from './User';

@Table
export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    @AllowNull(false)
    @Column(DataType.STRING)
    declare Text: string

    @AllowNull(false)
    @Column(DataType.DATE)
    declare createdAt: Date;

    @HasMany(() => Reply, {onDelete: 'CASCADE'})
    declare Replies: Reply[]

    @BelongsTo(() => ForumTopic)
    declare ForumTopic: ForumTopic

    @ForeignKey(() => ForumTopic)
    @Column
    declare TopicId: number;

    @BelongsTo(() => User)
    declare User: User

    @ForeignKey(() => User)
    @Column
    declare UserId: number;
}
