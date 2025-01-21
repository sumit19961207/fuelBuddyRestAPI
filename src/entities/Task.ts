import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn,UpdateDateColumn, } from "typeorm";

@Entity({name:"tasks"})


export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: number;
  
    @Column({ nullable: false })
    title: string;
  
    @Column({ nullable: false })
    description: string;
  
    @Column({ nullable: false })
    status: string;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
   updatedAt: Date;
  
  }
