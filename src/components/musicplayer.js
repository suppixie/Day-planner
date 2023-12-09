import React from 'react';

const songMatch = {
  Sunny: ['mRD0-GxqHVo?si=2VHcQ5fmkgk4TH0h', 

  'ge-OARWV9sE?si=vNtuHRTeTZ1Or59y ',
  
 'EO_i9nHvCEk?si=vyNw56uzEdR6QVtw'],
  Rainy: ['kOCkne-Bku4?si=8MMgBoJIfDEL9Nqx ',

  'KbHaIbDKQMc?si=UzixrcxF_6ZHfCyZ ',
  
  'pE49WK-oNjU?si=jSasbt4YdRbdjGdw '],
  Haze:
  [ 'DbxOmAsowd0?si=orXRCmeZXeM8iz7c',

  'imGaOIm5HOk?si=Rr413I8Tbe0xeYSt ',
  
  'vx4kLgnFexo?si=cgwbOud21TP1mtSJ']
};

function MusicPlayer( {weather} ) {
    const ytlink = (weather) => {
        const links = songMatch[weather] || [];
        if (links.length > 0) {
          const randomIndex = Math.floor(Math.random() * links.length);
          return links[randomIndex];
        }
        return null;
      };

  const youTubeLink = ytlink(weather);

  return (
    <div>
      {youTubeLink ? (
        <iframe 
        width="360" 
        height="215" 
        src={`https://www.youtube.com/embed/${youTubeLink}`}
        title="Music Player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen></iframe>
      ) : (
        <p>No song available for this weather</p>
      )}
    </div>
  );
}

export default MusicPlayer;
