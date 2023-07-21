import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { ForumTopic } from './ForumTopic';
import Reaction from './Reaction';
import { Reply } from './Reply';

// type TCommentDto = {
//     text: string;
//     id: number;
//     userAvatar?: string;
//     userName: string;
//     toUserName?: string;
//     toCommentId?: number;
// }
@Table
export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    @AllowNull(false)
    @Column(DataType.STRING)
    declare Text: string

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare AuthorYaId: number

    @AllowNull(false)
    @Column(DataType.DATE)
    declare createdAt: Date;

    @HasMany(() => Reply, {onDelete: 'CASCADE'})
    declare Replies: Reply[]

    @HasMany(() => Reaction, {onDelete: 'CASCADE'})
    declare Reactions: Reaction[]

    @BelongsTo(() => ForumTopic)
    declare ForumTopic: ForumTopic

    @ForeignKey(() => ForumTopic)
    @Column
    declare TopicId: number;
}
