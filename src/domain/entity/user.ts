import bcrypt from 'bcrypt' 
import { BaseColumns } from "./base";

export class User extends BaseColumns {
    public id: string
    public username: string
    public password: string
    public fname: string
    public lname: string
    public birthdate: string
    public isVerified: boolean
    public status: number
    public roles: any[]

    public validator?(): void {
        if (!this.fname) {
            throw new Error('first name is missing.');
        }
        if (!this.username) {
          throw new Error('username is missing.');
        }
        if (!this.password) {
          throw new Error('password is missing.');
        }
        return;
    };

    public attachRoles(role: Role): void {
      this.roles.push(role)
    }

    public detachRoles(roleID: string): boolean {
      let i: number = 0;
      let removed: boolean = false;
      while (i < this.roles.length) {
        if (this.roles[i].id == roleID) {
          this.roles.splice(i, 1)
          removed = true
        }
        i += 1
      }
      return removed
    }

    public async setHashedPass(password: string): Promise<void> {
      const rounds = 10;
      const hashed = await bcrypt.hash(password, rounds)
      this.password = hashed
    }

    public validatePassword(plainPassword: string): boolean {
      return bcrypt.compareSync(plainPassword, this.password); 
    }

}

export class Role{
  constructor(
      public id: string,
      public name: string, 
      public description: string,
      public status: string,
      public permissions?: Permission[]
      ) {
  }

  public attachPermission(permit: Permission): void {
    this.permissions.push(permit)
  }

  public detachPermissions(permitID: number): boolean {
    let i: number = 0;
    let removed: boolean = false;
    while (i < this.permissions.length) {
      if (this.permissions[i].id == permitID) {
        this.permissions.splice(i, 1)
        removed = true
      }
      i += 1
    }
    return removed
  }
}

export class Permission{
  public id: number
  public object: string
  public action: string
  public description: string
}