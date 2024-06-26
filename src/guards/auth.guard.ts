import {
  BadRequestException,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const userPayload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.SECRET
          }
        );
        
        const userExit = await this.usersService.findByCode(userPayload.code);
        if (!userExit.status) throw new BadRequestException('User not belong to token, please try again');

        //Assign user to request object
        request.currentUser = userExit.data;
      } catch {
        throw new ForbiddenException('Invalid token or expired');
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }