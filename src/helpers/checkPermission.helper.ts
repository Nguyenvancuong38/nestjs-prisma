import { BadRequestException } from "@nestjs/common";
import { User } from "@prisma/client";

export class Permission {
    static check(code: string, currentUser: User) {
        if (code === currentUser.code) return;
        if (currentUser.role === 'admin') return;
        throw new BadRequestException('User can not perform action');
    }
}