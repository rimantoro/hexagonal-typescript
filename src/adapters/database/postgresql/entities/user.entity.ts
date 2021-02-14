import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, JoinTable} from "typeorm";
import bcrypt from 'bcrypt';

import {TimeBaseColumns} from "./base.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 32, unique: true })
  username: string;

  @Column({ type: "varchar", length: 128 })
  password: string;

  @Column({ type: "varchar", length: 32 })
  fname: string;

  @Column({ type: "varchar", length: 32, nullable: true })
  lname: string;

  @Column({ type: "date", nullable: true })
  birthdate: string;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "smallint", default: 1 })
  status: number;

  @Column(type => TimeBaseColumns)
  time: TimeBaseColumns

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  // constructor(username: string, password: string, fname: string, lname: string, birthdate: Date, isVerified?: boolean, status?: number) {
  //   this.username = username
  //   this.password = password
  //   this.fname = fname
  //   this.lname = lname
  //   this.birthdate = birthdate
  //   this.isVerified = isVerified
  //   this.status = status

  //   this.time = new TimeBaseColumns()

  //   this.setHashedPass(password)

  //   console.log(this.password)
  // }

  // public attachRoles(role: Role): void {
  //   this.roles.push(role)
  // }

  // public detachRoles(roleID: string): boolean {
  //   let i: number = 0;
  //   let removed: boolean = false;
  //   while (i < this.roles.length) {
  //     if (this.roles[i].id == roleID) {
  //       this.roles.splice(i, 1)
  //       removed = true
  //     }
  //     i += 1
  //   }
  //   return removed
  // }

  // public async setHashedPass(password: string): Promise<void> {
  //   const rounds = 10;
  //   const hashed = await bcrypt.hash(password, rounds)
  //   this.password = hashed
  // }

  // public validatePassword(plainPassword: string): boolean {
  //   return bcrypt.compareSync(plainPassword, this.password); 
  // }

}

@Entity()
export class Role {
  
  @PrimaryColumn({ type: "char", length: 16 })
  id: string;

  @Column({ type: "varchar", length: 32 })
  name: string;

  @Column({ type: "varchar", length: 64 })
  description: string;

  @Column({ type: "smallint", default: 1 })
  status: number;

  @Column(type => TimeBaseColumns)
  time: TimeBaseColumns

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

}

@Entity()
export class Permission  {
  
  @PrimaryColumn({ type: "char", length: 32 })
  id: string;

  @Column({ type: "varchar", length: 16 })
  object: string;

  @Column({ type: "varchar", length: 16 })
  action: string;

  @Column({ type: "varchar", length: 64 })
  description: string;

  @Column({ type: "smallint", default: 1 })
  status: number;

  @Column(type => TimeBaseColumns)
  time: TimeBaseColumns

}