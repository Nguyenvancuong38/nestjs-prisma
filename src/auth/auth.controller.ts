import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    signIn(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto);
    }
}
