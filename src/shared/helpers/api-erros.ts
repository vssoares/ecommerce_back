import { HttpException, HttpStatus } from '@nestjs/common';

const Default = 'Ocorreu um erro interno';

export class CustomError extends HttpException {
  constructor(status: HttpStatus, message: string = Default) {
    super({ status: false, message: message }, status);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = Default) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = Default) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = Default) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = Default) {
    super(HttpStatus.FORBIDDEN, message);
  }
}
