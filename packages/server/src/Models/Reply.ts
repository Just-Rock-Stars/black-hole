import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Comment } from './Comment';
import { User } from './User';

@Table
export class Reply extends Model<InferAttributes<Reply>, InferCreationAttributes<Reply>> {
    @AllowNull(false)
    @Column(DataType.STRING)
    declare Text: string

    @AllowNull(false)
    @Column(DataType.DATE)
    declare createdAt: Date;

    @ForeignKey(() => Comment)
    @Column
    declare CommentId: number

    @BelongsTo(() => Comment)
    declare Comment: Comment

    @ForeignKey(() => User)
    @Column
    declare UserId: number

    @BelongsTo(() => User)
    declare User: User
}
