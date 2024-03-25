import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import {Music} from './Music';

interface MusicListProps{
    musics: Music[];
}

const MusicList: React.FC<MusicListProps> = ({musics}) => (
    <IonList>
        {musics.map((track, index) => (
            <IonItem key={index}>
                <IonLabel>{track.artist} - {track.title}</IonLabel>
            </IonItem>
        ))}
    </IonList>
);

export default MusicList;