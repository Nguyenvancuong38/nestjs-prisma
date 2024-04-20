import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    signIn(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto);
    }
}
