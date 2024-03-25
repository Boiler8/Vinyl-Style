import { 
  IonApp,
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonMenu, 
  IonSplitPane,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonButton,
  IonAlert,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import { Music } from './Music';
import MediaPlayer from './MediaPlayer';
import axios from 'axios';

const Home: React.FC = () => {
  
  const [showNujabesBioAlert, setNujabesBioAlert] = useState(false);
  const [stoicQuote, setStoicQuote] = useState<string>('');
  const [stoicAuthor, setStoicAuthor] = useState<string>('');



  useEffect(() => {
    fetchStoicQuote();
  }, []); // Fetch stoic quote when component mounts

  const fetchStoicQuote = () => {
    fetch('https://stoic.tekloon.net/stoic-quote')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStoicQuote(data.quote);
        setStoicAuthor(data.author);
      })
      .catch(error => {
        console.error('There was a problem fetching the stoic quote:', error);
      });
  };

  

  const [music, setMusic] = useState<Music[]>([]); // Changed state type to an array of Music
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  useEffect(() => {
    fetchMusicData();
  }, []);

  const fetchMusicData = () => {

    axios.get('http://127.0.0.1:8101/api/songs')
      .then(response => {
        console.log(response.data);
        setMusic(response.data);
      })
};
  const handleSongButtonClick = (index: number) => {
    setCurrentSongIndex(index);
  }



  const handleNujabesBioClick = () =>{
    setNujabesBioAlert(true);
  };
  const handleNujabesBioAlertDismiss = () => {
    setNujabesBioAlert(false);
  };

  const currentSong = music[currentSongIndex] || {};

  return (
    <IonApp>
      <IonSplitPane when="xs" contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Vinyl Style</IonTitle>
            </IonToolbar>



          </IonHeader>
          <IonContent className="sidebar">
            <div className="ion-list-container">
              <IonList className="ion-list-content">
                <IonListHeader>Songs</IonListHeader>
                {music.map((song: Music, index: number) => (
                  <IonItem key={index}>
                    <IonLabel>
                      <IonButton onClick={() => handleSongButtonClick(index)}>
                        {song.title} - {song.artist}
                      </IonButton>
                    </IonLabel>
                  </IonItem>
                ))}



                <IonLabel>
                  <IonItem>
                    <IonButton onClick={handleNujabesBioClick}>
                      Who was Nujabes?
                      <img src='../public/NujabesHimself.jpg' height='50' width='100' />
                    </IonButton>
                  </IonItem>
                </IonLabel>



                <IonLabel>
                  <div className="stoic-quote">
                    <p>Stoic Quote:</p>
                    <p>{stoicQuote} - {stoicAuthor}</p>
                  </div>
                </IonLabel>
              </IonList>
            </div>
          </IonContent>
        </IonMenu>


        
        <IonPage id="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                <h1>Vinyl Style</h1>
                <h3>Blending classic style with the new age</h3>
              </IonTitle>
              <IonTitle slot="end" />
            </IonToolbar>
          </IonHeader>
          <IonContent>
          { currentSong.mp3_file_path &&
            <MediaPlayer
              title={currentSong.title}
              artist={currentSong.artist}
              album={currentSong.album}
              albumCover={currentSong.album_cover}
              localFilePath={currentSong.mp3_file_path}
            />
          }
            <div className="images-container">
              <div className="album-container">
                <img
                  src={currentSong.album_cover}
                  height='400'
                  width='400'
                  alt="album cover"
                  className={currentSongIndex === 0 ? "album-cover-spin" : ""}
                />
              </div>
            </div>
          </IonContent>
        </IonPage>
      </IonSplitPane>
      <IonAlert
        isOpen={showNujabesBioAlert}
        onDidDismiss={handleNujabesBioAlertDismiss}
        header="Who was Nujabes?"
        message="The one-of-a-kind sound that transcends genres, based on hip-hop with harmonizing jazz, soul, house, etc. and still being highly evaluated all over the world.

        From 1995 to 2010 in Shibuya Tokyo, Japan, Nujabes worked on his music career and in July 1995, he opened the record store GUINNES S RECORDS in Udagawa-cho, Shibuya. In March 1999, he opened Park Avenue Studios in Jinn, Shibuya, and also founded the independent label hydeout productions.
        
        After releasing many 12inch singles he released his first album“metaphorical music”(2003) following up with “Modal Soul” (2005) and “Spiritual State” (2011). He also released two collection compilations: “Hydeout Productions 1st Collection” (2003) and “2nd Collection” (2007).
        
        Additionally, Nujabes was chosen for a music director at the Paris Collection of COMME des GAR CONS(2004), produced the soundtrack for Shinichiro Watanabe’s anime series “Samurai Champloo”, appeared in Sonar Sound Tokyo etc.
        
        In 2008, Nujabes released a compilation album ‘Modal Soul Classics By Nujabes’, a collection of music influenced him.
        
        On February 26th 2010, Nujabes died in a car accident."
        buttons={['Dismiss']}
      />
    </IonApp>
  );
};

export default Home;
