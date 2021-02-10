import {Entity, Column, ManyToMany, JoinTable, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 30
  })
  username: string;
  
  @Column("varchar", {
    length: 30
  })
  password: string;
  
  @Column("varchar", {
    length: 30
  })
  fname: string;
  
  @Column("varchar", {
    length: 30
  })
  lname: string;
  
  @Column("timestamp")
  birthdate?: Date;
  
  @Column("boolean")
  isVerified?: boolean;
  
  @Column("int")
  status?: number;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
} 

@Entity()
export class Permission {
  
  @PrimaryColumn("varchar", {
    length: 30
  })
  id: string;

  @Column("varchar")
  object: string;

  @Column("varchar")
  action: string;

  @Column("varchar")
  description: string;

}

@Entity()
export class Role {
  
  @PrimaryColumn("varchar", {
    length: 30
  })
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  description: string;

  @Column("smallint")
  status?: number;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

}