export class AppError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export class NotFountError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class BadRequest extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
