import React from 'react';
import { IonCard, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/react';

const MediaPlayer: React.FC<{ title: string; artist: string; album: string; albumCover: string; localFilePath: string }> = ({ title, artist, album, albumCover, localFilePath }) => {
  
  
  console.log(localFilePath);
    return (
    <div className="media-player-container">
      <div className="media-player-card">
        <IonCard>
          <IonCardContent>
            <IonCardTitle>Now Playing: {title}</IonCardTitle>
            {/* Your media player implementation */}
            <audio controls>
              <source src={localFilePath} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <IonCardSubtitle>By: {artist}</IonCardSubtitle>
            <IonCardSubtitle>Album: {album}</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default MediaPlayer;