import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const onPlay = function (data) {
  const key = localStorage.getItem('videoplayer-current-time');
  if (key) {
    player.setCurrentTime(parseFloat(key));
  }
  player.on('timeupdate', throttle(timeUpdate, 1000));
  player.off('play', onPlay);
};

function timeUpdate(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds.toString());
}

player.on('play', onPlay);
