import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with options
  app.enableCors({
    origin: 'http://localhost:5173', // Frontend origin
    methods: 'GET,POST,PUT,PATCH,DELETE',  // Allowed methods
    credentials: true                // Allow cookies and credentials
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder(  )
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

  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
