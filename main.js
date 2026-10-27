const musicAudio = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

function updateMusicButton() {
  musicToggle.classList.toggle('is-playing', isPlaying);
  musicToggle.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Prender música');
  musicToggle.querySelector('.music-toggle__label').textContent = isPlaying ? 'Pausar música' : 'Prender música';
}

musicAudio.addEventListener('play', () => {
  isPlaying = true;
  updateMusicButton();
});

musicAudio.addEventListener('pause', () => {
  isPlaying = false;
  updateMusicButton();
});

musicToggle.addEventListener('click', async () => {
  if (!musicAudio) {
    return;
  }

  if (musicAudio.paused) {
    try {
      musicAudio.load();
      musicAudio.volume = 0.45;
      await musicAudio.play();
      isPlaying = true;
    } catch (error) {
      console.log('No se pudo iniciar la canción:', error);
      isPlaying = false;
    }
  } else {
    musicAudio.pause();
    isPlaying = false;
  }

  updateMusicButton();
});

window.onload = () => {
  document.body.classList.remove('container');
  musicAudio.volume = 0.45;
  updateMusicButton();

  musicAudio.play().catch((error) => {
    console.log('El navegador requiere una interacción para reproducir la canción:', error);
  });
};