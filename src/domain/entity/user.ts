import { bcrypt } from 'bcrypt' 
import { BaseColumns } from "./base";

export class User extends BaseColumns {
    public id: string
    public username: string
    public password: string
    public fname: string
    public lname: string
    public birthdate: Date
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

    public setHashedPass(password: string): void {
      const rounds = 10;
      return bcrypt.hash(password, rounds, function(err, hash) {
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          this.password = hash
        }
      })
    }

    public validatePassword(plainPassword: string): boolean {
      return bcrypt.compareSync(plainPassword, this.password); 
    }

}

export class Role{
  // public id: string
  // public name: string
  // public description: string
  // public status: string
  // public permissions: any[]

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

  public detachPermissions(permitID: string): boolean {
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
  public id: string
  public object: string
  public action: string
  public description: string
}