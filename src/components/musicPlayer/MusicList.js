import { Music } from './Music.entity';
import lalalalovesongImg from '../../rsc/music-img/lalalalovesong.png';
import gdrImg from '../../rsc/music-img/공드리.jpg';
import sheImg from '../../rsc/music-img/she.jpg';
import sprintImg from '../../rsc/music-img/난춘.jpg';
import todayImg from '../../rsc/music-img/today.jpg';

const musicInfos = [
  {
    title: '공드리',
    singer: '혁오',
    src: 'https://hovlee.s3.ap-northeast-2.amazonaws.com/music/%EA%B3%B5%EB%93%9C%EB%A6%AC.mp3',
    img: gdrImg,
  },
  {
    title: 'She',
    singer: '카더가든',
    src: 'https://hovlee.s3.ap-northeast-2.amazonaws.com/music/she.mp3',
    img: sheImg,
  },{
  title: 'la la la lovesong',
  singer: '백예린',
  src: 'https://hovlee.s3.ap-northeast-2.amazonaws.com/music/lalalalovesong.mp3',
  img: lalalalovesongImg,
},
{
  title: '난춘',
  singer: '새소년',
  src: 'https://hovlee.s3.ap-northeast-2.amazonaws.com/music/%EB%82%9C%EC%B6%98.mp3',
  img: sprintImg,
},
{
  title: '오늘',
  singer: '오왠',
  src: 'https://hovlee.s3.ap-northeast-2.amazonaws.com/music/%EC%98%A4%EB%8A%98.mp3',
  img: todayImg,
}];

export class MusicManager {
  static getMusicList() {
    const musicList = [];
    musicInfos.forEach(info => musicList.push(new Music(info)));

    return musicList;
  }
}