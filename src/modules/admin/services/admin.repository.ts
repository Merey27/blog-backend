import { Injectable } from "@nestjs/common";
import { AdminModel } from "../model/admin.model";

@Injectable()
export class AdminRepository {
  private readonly admins: AdminModel[];

  constructor() {
    this.admins = [
      {
        id: 1,
        login: "admin",
        password: "secret"
      }
    ];
  }

  async find(id: number): Promise<AdminModel | undefined> {
    return this.admins.find(admin => admin.id === id);
  }

  async findByLogin(login: string): Promise<AdminModel | undefined> {
    return this.admins.find(admin => admin.login === login);
  }
}
