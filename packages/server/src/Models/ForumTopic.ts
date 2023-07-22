import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from './Comment';
import { Forum } from './Forum';
import { User } from './User';

// type TopicDto = {
//     authorName: string;
//     authorAvatar: string;
//     topicName: string;
//     lastMessageDate?: string;
//     lastMessageAuthor?: string;
//     commentsNumber: number;
// }

@Table
export class ForumTopic extends Model<InferAttributes<ForumTopic>, InferCreationAttributes<ForumTopic>> {
    @AllowNull(false)
    @Column(DataType.STRING)
    declare TopicName: string
    
    @HasMany(() => Comment, {onDelete: 'CASCADE'})
    declare Comments: Comment[]
    
    @ForeignKey(() => Forum)
    @Column
    declare ForumId: number;

    @BelongsTo(() => Forum)
    declare Forum: Forum;

    @ForeignKey(() => User)
    @Column
    declare UserId: number;

    @BelongsTo(() => User)
    declare User: User;
}