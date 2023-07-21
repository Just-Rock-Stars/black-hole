import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from './Comment';
import Reaction from './Reaction';

@Table
export class Reply extends Model<InferAttributes<Reply>, InferCreationAttributes<Reply>> {
    @AllowNull(false)
    @Column(DataType.STRING)
    declare Text: string

    // Добавить пользователя
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare AuthorYaId: number

    @AllowNull(false)
    @Column(DataType.DATE)
    declare createdAt: Date;

    @HasMany(() => Reaction, {onDelete: 'CASCADE'})
    declare Reactions: Reaction[]

    @ForeignKey(() => Comment)
    @Column
    declare CommentId: number

    @BelongsTo(() => Comment)
    declare Comment: Comment
}
