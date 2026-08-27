import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { SessionModel } from '../../schemas/session.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Session', schema: SessionModel.schema }])],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
