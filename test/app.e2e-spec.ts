import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const auth: AuthDto = { email: 'jest@jest.ru', password: '123' };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer()).get('/users/').expect(200);
    // .expect('Hello World!');
  });
});
