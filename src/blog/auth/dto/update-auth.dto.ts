import { PartialType } from '@nestjs/swagger';
import { CreateUser } from './create-auth.dto';

export class UpdateUser extends PartialType(CreateUser) {}
