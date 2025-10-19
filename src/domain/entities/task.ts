import { BaseEntity } from "./base";

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  isCompleted: boolean;
  completedAt?: Date;
  userId: string;
}
