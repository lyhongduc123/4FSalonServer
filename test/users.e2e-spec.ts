import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { after } from 'node:test';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../src/common';
import { JwtService } from '@nestjs/jwt';

const mockUser = {
    email: 'admin',
    password: 'adminpassword',
    role: 'admin',
}

const mockCustomer = {
    email: 'customer',
    password: 'customerpassword',
    role: 'customer',
}

describe('UserController (e2e)', () => { 
    let app: INestApplication;
    let jwtService: JwtService;
    let adminToken: string;
    let customerToken: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            
        })
        .overrideGuard(RolesGuard).useValue({
            canActivate: (context: ExecutionContext) => {
                const req = context.switchToHttp().getRequest();
                req.user = { email: 'test1' };
                return true;
            }
        })
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        jwtService = moduleFixture.get<JwtService>(JwtService);
        adminToken = jwtService.sign(mockUser);
        customerToken = jwtService.sign(mockCustomer);
    })

    describe('POST /api/users', () => {
        it('Should: Create a new user', () => {
            return request(app.getHttpServer())
            .post('/api/users/')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                email: 'test2',
                password: 'test1password',
            })
            .expect(201)
        })

        it('Should: Failed to create a new user', () => {
            return request(app.getHttpServer())
            .post('/api/users/')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                email: 'test2',
                password: 'test1password',
            })
            .expect(400)
        })

        it('Should: Unauthorized to create a new user', () => {
            return request(app.getHttpServer())
            .post('/api/users/')
            .set('Authorization', `Bearer ${customerToken}`)
            .send({
                email: 'test2',
                password: 'test1password',
            })
            .expect(401)
        })
    })

    describe('GET /api/users/', () => {
        it ('Get all users', () => {
            return request(app.getHttpServer())
            .get('/api/users/')
            .expect(200)
        })
    })

    // describe('GET /api/users/:id', () => {
    //     it ('Get a user by id', () => {
    //         return request(app.getHttpServer())
    //         .get('/api/users/1')
    //         .expect(200)
    //     })

    //     it ('Failed to get a user by id', () => {
    //         return request(app.getHttpServer())
    //         .get('/api/users/2')
    //         .expect(404)
    //     })

    //     it ('Unauthorized to get a user by id', () => {
    //         return request(app.getHttpServer())
    //         .get('/api/users/1')
    //         .auth(customerToken, { type: 'bearer' })
    //         .expect(401)
    //         .expect(403)
    //     })
    // })

    // it ('Get a user by search', () => {
    //     return request(app.getHttpServer())
    //     .get('/api/users/search')
    //     .expect(200)
    // })

    // it ('Update a user', () => {
    //     return request(app.getHttpServer())
    //     .put('/api/users/')
    //     .send({
    //         email: 'test1',
    //         password: 'test1password',
    //     })
    //     .expect(200)
    // })

    // it ('Delete a user', () => {
    //     return request(app.getHttpServer())
    //     .delete('/api/users/1')
    //     .expect(200)
    // })






    afterAll(async () => {
        await app.close();
    })
})