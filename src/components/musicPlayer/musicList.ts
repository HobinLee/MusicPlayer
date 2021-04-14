import { Music } from './music.entity';
import lalalalovesongImg from '../../rsc/music-img/lalalalovesong.png';
import gdrImg from '../../rsc/music-img/공드리.jpg';
import sheImg from '../../rsc/music-img/she.jpg';
import sprintImg from '../../rsc/music-img/난춘.jpg';
import todayImg from '../../rsc/music-img/today.jpg';

const musicInfos = [{
  title: 'la la la lovesong',
  singer: '백예린',
  src: '../rsc/music/lalalalovesong.mp3',
  img: lalalalovesongImg,
},
{
  title: '공드리',
  singer: '혁오',
  src: '../rsc/music/공드리.mp3',
  img: gdrImg,
},
{
  title: 'She',
  singer: '카더가든',
  src: '../rsc/music/she.mp3',
  img: sheImg,
},
{
  title: '난춘',
  singer: '새소년',
  src: '../rsc/music/난춘.mp3',
  img: sprintImg,
},
{
  title: '오늘',
  singer: '오왠',
  src: '../rsc/music/오늘.mp3',
  img: todayImg,
}
];

export class MusicManager {
  static getMusicList(): Music[]{
    const musicList: Music[] = [];
    musicInfos.forEach(info => musicList.push(new Music(info)));

    return musicList;
  }
}