import {
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IPod } from './Search';

const PodcastInfo: React.FC = () => {
  const { podcastId }: { podcastId: string } = useParams();
  const [podcasts, setPodcasts] = useState<IPod[]>([]);

  console.log(podcastId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary' className='ion-text-center'>
          <IonTitle>Podcast Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='secondary'>
        <IonGrid></IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PodcastInfo;
