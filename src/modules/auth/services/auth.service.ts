import { Injectable } from "@nestjs/common";
import { AdminRepository } from "../../admin/services/admin.repository";
import { AdminModel } from "../../admin/model/admin.model";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private adminRepository: AdminRepository,
    private jwtService: JwtService
  ) {
  }

  async validateAdmin(login: string, pass: string): Promise<AdminModel | null> {
    const admin: AdminModel = await this.adminRepository.findByLogin(login);

    if (admin && admin.password === pass) {
      const { password, ...secureAdmin } = admin;
      return secureAdmin;
    }

    return null;
  }

  async login(admin: AdminModel) {
    const payload = { id: admin.id };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }

}
