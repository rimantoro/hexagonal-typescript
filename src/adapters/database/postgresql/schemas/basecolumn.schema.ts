import {EntitySchemaColumnOptions} from "typeorm";

export const BaseColumnSchemaPart = {
  createdAt: {
    name: 'created_at',
    type: 'timestamp with time zone',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp with time zone',
    updateDate: true,
  } as EntitySchemaColumnOptions,
  deletedAt: {
    name: 'deleted_at',
    type: 'timestamp with time zone',
    deleteDate: true,
  } as EntitySchemaColumnOptions
};