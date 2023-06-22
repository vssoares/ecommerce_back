import { HttpException, HttpStatus } from '@nestjs/common';

const Default = 'Ocorreu um erro interno';

export class BadRequestError extends HttpException {
  constructor(message: string = Default) {
    super({ status: false, message: message }, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundError extends HttpException {
  constructor(message: string = Default) {
    super({ status: false, message: message }, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedError extends HttpException {
  constructor(message: string = Default) {
    super({ status: false, message: message }, HttpStatus.UNAUTHORIZED);
  }
}
