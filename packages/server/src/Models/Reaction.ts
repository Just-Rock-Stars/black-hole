import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Comment } from './Comment';
import { Reply } from './Reply';

export enum Reactions {
    Smile,
    AngryFace
}

@Table
export default class Reaction extends Model<InferAttributes<Reaction>, InferCreationAttributes<Reaction>> {
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare Type: Reactions

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare AuthorYaId: number

    @ForeignKey(() => Comment)
    @Column
    declare CommentId: number

    @BelongsTo(() => Comment)
    declare Comment: Comment

    @ForeignKey(() => Reply)
    @Column
    declare ReplyId: number;

    @BelongsTo(() => Reply)
    declare Reply: Reply
}
