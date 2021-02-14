import {Column} from "typeorm";

export class TimeBaseColumns {
  @Column({ name: "created", type: "timestamp with time zone", nullable: true, default: new Date()  })
  createdAt: string;

  @Column({ name: "updated", type: "timestamp with time zone", nullable: true, default: new Date()  })
  updatedAt: string;

  @Column({ name: "deleted", type: "timestamp with time zone", nullable: true  })
  deletedAt: string;
}