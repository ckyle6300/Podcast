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
  const [podcast, setPodcast] = useState<IPod>();

  console.log(podcastId);

  useEffect(() => {
    const getPodcastInfo = async () => {
      const req = await fetch(`http://localhost:5100/podcast/${podcastId}`);
      const podcatInfo = await req.json();
      console.log(podcatInfo);
      setPodcast(podcatInfo.feed);
    };
    getPodcastInfo();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary' className='ion-text-center'>
          <IonTitle>{podcast ? podcast.title : ''}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='secondary'>
        <IonGrid></IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PodcastInfo;
