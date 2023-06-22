import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestError extends HttpException {
  constructor(message: string) {
    super({ status: false, message }, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundError extends HttpException {
  constructor(message: string) {
    super({ status: false, message }, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedError extends HttpException {
  constructor(message: string) {
    super({ status: false, message }, HttpStatus.UNAUTHORIZED);
  }
}
