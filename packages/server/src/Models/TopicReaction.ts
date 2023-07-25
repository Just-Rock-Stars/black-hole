import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './User';
import { Reaction } from './Reaction';
import { ForumTopic } from './ForumTopic';

@Table
export class TopicReaction extends Model<InferAttributes<TopicReaction>, InferCreationAttributes<TopicReaction>> {
    @ForeignKey(() => Reaction)
    @Column
    declare ReactionId: number;
    
    @ForeignKey(() => User)
    @Column
    declare UserId: number;
    
    @BelongsTo(() => ForumTopic)
    declare ForumTopic: ForumTopic

    @ForeignKey(() => ForumTopic)
    @Column
    declare TopicId: number;
}
