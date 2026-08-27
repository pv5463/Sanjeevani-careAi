import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsentController } from './consent.controller';
import { ConsentService } from './consent.service';
import { ConsentModel } from '../../schemas/consent.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Consent', schema: ConsentModel.schema }])],
  controllers: [ConsentController],
  providers: [ConsentService],
  exports: [ConsentService],
})
export class ConsentModule {}
