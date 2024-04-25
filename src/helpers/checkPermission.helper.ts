import { BadRequestException } from "@nestjs/common";
import { User } from "@prisma/client";

export class Permission {
    static check(id: number, currentUser: User) {
        if (id === currentUser.id) return;
        if (currentUser.role === 'admin') return;
        throw new BadRequestException('User can not perform action');
    }
}