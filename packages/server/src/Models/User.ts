import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, Column, DataType, HasMany, IsUrl, Model, Table } from 'sequelize-typescript';
import { Comment } from './Comment';
import { ForumTopic } from './ForumTopic';
import { Reply } from './Reply';

@Table
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    @AllowNull(false)
    @Column(DataType.STRING)
    declare Name: string

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare YaId: number

    @IsUrl
    @Column(DataType.STRING)
    declare Avatar: string | null;

    @HasMany(() => Comment)
    declare Comments: Comment[]

    @HasMany(() => Reply)
    declare Replies: Reply[]

    @HasMany(() => ForumTopic)
    declare Topics: ForumTopic[]
}
