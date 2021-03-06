import { Controller, Get } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { getPackedSettings } from 'node:http2';
import { musicList } from './music.json';

@Controller('music')
export class MusicController {

  @Get()
  getMusicList(@Res() res : Response ) : object {
    console.log('server request');
    res.json(musicList);
    return musicList;
  }
}
