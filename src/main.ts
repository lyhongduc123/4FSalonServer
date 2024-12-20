import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS with options
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      `http://localhost:${process.env.PORT ?? 3000}`,
      'http://fall2024c8g2.int3306.freeddns.org',
    ], // Frontend origin
    methods: 'GET,POST,PUT,PATCH,DELETE',  // Allowed methods
    credentials: true                // Allow cookies and credentials
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .addOAuth2()
  .setTitle('4F API')
  .setDescription('API documentaion')
  .setVersion('1.1')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      operationsSorter: function (a, b) {
        var order = {'get': '0', 'post': '1', 'put': '2', 'patch':'3', 'delete': '4'};
        return order[a.get("method")].localeCompare(order[b.get("method")]);
      },
      filter: true,
      showRequestDuration: true,
    },
  });

  app.useStaticAssets(join(__dirname, '..', 'client/dist'));
  app.setBaseViewsDir(join(__dirname, '..', 'client/dist'));

  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(join(__dirname, '..', 'client/dist/index.html'));
    } else {
      next();
    }
  });

  app.setViewEngine('hbs');
  
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT ?? 3000}`);
  });
  
}
bootstrap()