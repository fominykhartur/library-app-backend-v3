import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { RolesService } from 'src/roles/roles.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let rolesService: RolesService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [RolesService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    rolesService = app.get<RolesService>(RolesService);
    console.log(rolesService.getRoleByName('ADMIN'));
  });

  afterAll(async () => {
    app;
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
