import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicController } from './music/music.controller';

@Module({
  imports: [],
  controllers: [AppController, MusicController],
  providers: [AppService],
})
export class AppModule {}
