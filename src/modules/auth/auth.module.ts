import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AdminModule } from "../admin/admin.module";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./services/local.strategy";
import { AuthController } from "./controller/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./services/jwt.strategy";

@Module({
  imports: [
    AdminModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN") }
      }),
      inject: [ConfigService]
    })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {
}
