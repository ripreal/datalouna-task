import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinnportModule } from './skinnport/skinnport.module';
import { ItemsModule } from './items/items.module';
import { PurchasesModule } from './purchases/purchases.module';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { InitialDataSeed } from './database/inital.data.seed';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // use common expression below to find entities 
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    SkinnportModule,
    ItemsModule,
    PurchasesModule,
    UsersModule,
  ],
  providers: [],
})
export class AppModule {

  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    const initialDataSeed = new InitialDataSeed();
    await initialDataSeed.run(this.connection);
  }

}
