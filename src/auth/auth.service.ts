import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(loginDto: LoginDto) {
        const user = await this.usersService.findByCode(loginDto.code);
        const isMatch = await bcrypt.compare(loginDto.password, user.data.password);
        if (!isMatch) throw new UnauthorizedException();
        const payload = { code: user.data.code, username: user.data.name, email: user.data.email };
        return {
            status: 200,
            message: "Login successfully",
            token: await this.jwtService.signAsync(payload)
        }
    }
}
