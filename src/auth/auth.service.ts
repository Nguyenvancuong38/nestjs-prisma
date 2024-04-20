import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(loginDto: LoginDto) {
        const user = await this.usersService.findByCode(loginDto.code);
        if (user.data.password != loginDto.password) throw new UnauthorizedException();
        const payload = { code: user.data.code, username: user.data.userName, email: user.data.email };
        return {
            status: 200,
            message: "Login successfully",
            token: await this.jwtService.signAsync(payload)
        }
    }
}
