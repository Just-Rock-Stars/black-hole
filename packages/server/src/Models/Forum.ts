import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ForumTopic } from './ForumTopic';

@Table
export class Forum extends Model<InferAttributes<Forum>, InferCreationAttributes<Forum>> {
    @AllowNull(false)
    @Column(DataType.STRING)
    declare Name: string

    @AllowNull(false)
    @Column(DataType.STRING)
    declare Description: string

    @HasMany(() => ForumTopic, {onDelete: 'CASCADE'})
    declare Topics: ForumTopic[]
}
