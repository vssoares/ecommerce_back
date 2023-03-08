import { HttpException, HttpStatus } from "@nestjs/common"

export class ApiError extends HttpException {
	public readonly statusCode: number

	constructor(message: string, statusCode: HttpStatus) {
		super({ status: false, message }, statusCode);
		this.statusCode = statusCode
	}
}

export class BadRequestError extends ApiError {
	constructor(message: string) {
		super(message, HttpStatus.BAD_REQUEST)
	}
}

export class NotFoundError extends ApiError {
	constructor(message: string) {
		super(message, HttpStatus.NOT_FOUND)
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message: string) {
		super(message, HttpStatus.UNAUTHORIZED)
	}
}