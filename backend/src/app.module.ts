import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MarketEventsModule } from './market-events/market-events.module';
import { S3Module } from 'nestjs-s3';
import { s3Config } from './config/s3.config';
import { FilesModule } from './files/files.module';
import { MarketAttendeesModule } from './market-attendees/market-attendees.module';
import { MarketplacesModule } from './marketplaces/marketplaces.module';
import { MarketplaceReviewsModule } from './marketplace-reviews/marketplace-reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig),
    S3Module.forRoot(s3Config),
    AuthModule,
    UsersModule,
    MarketEventsModule,
    FilesModule,
    MarketAttendeesModule,
    MarketplacesModule,
    MarketplaceReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
