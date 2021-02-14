import { EntitySchema } from "typeorm";
import { User, Role, Permission } from "../../../../domain/entity/user";
import { BaseColumnSchemaPart } from "./basecolumn.schema";

// export const UserEntity = new EntitySchema<User>({
//   name: "users",
//   columns: {
//     id: { type: "uuid", primary: true, generated: true },
//     username: { type: "varchar", unique: true, length: 32 },
//     password: { type: "varchar", length: 128 },
//     fname: { type: "varchar", length: 32 },
//     lname: { type: "varchar", length: 32 },
//     birthdate: { type: "date" },
//     isVerified: { type: "boolean", name: "is_verified" },
//     status: { type: "smallint" },
    
//     // extend default column
//     ...BaseColumnSchemaPart
//   },
//   relations: {
//     roles: {
//         type: "many-to-many",
//         target: "roles"
//     }
//   }
// })

// export const RoleEntity = new EntitySchema<Role>({
//   name: "roles",
//   columns: {
//     id: { type: "char", primary: true, length: 16 },
//     name: { type: "varchar", length: 32 },
//     description: { type: "varchar", length: 64 },
//     status: { type: "smallint" },
//     ...BaseColumnSchemaPart
//   },
//   relations: {
//     permissions: {
//         type: "many-to-many",
//         target: "permissions"
//     }
//   }
// })

// export const PermissionEntity = new EntitySchema<Permission>({
//   name: "permissions",
//   columns: {
//     id: { type: "char", primary: true, length: 32 },
//     object: { type: "varchar", length: 16 },
//     action: { type: "varchar", length: 16 },
//     description: { type: "varchar", length: 64 },
//     ...BaseColumnSchemaPart
//   },
//   uniques: [
//     { name: "unique_obj_act", columns: [ "object", "action" ] }
//   ]
// })