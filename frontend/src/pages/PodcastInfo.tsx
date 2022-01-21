import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
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

export interface Episode {
  chapterUrl: string;
  datePublished: number;
  datePublishedPretty: string;
  description: string;
  duration: number;
  enclosureLength: number;
  enclosureType: number;
  enclosureUrl: string;
  episode: number | null;
  feedId: number;
  feedImage: string;
  id: number;
  image: string;
  link: string;
  title: string;
  season: number;
  transcriptUrl: string | null;
}

const PodcastInfo: React.FC = () => {
  const { podcastId }: { podcastId: string } = useParams();
  const [podcast, setPodcast] = useState<IPod>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  console.log(podcastId);

  useEffect(() => {
    const getPodcastInfo = async () => {
      const req = await fetch(`http://localhost:5100/podcast/${podcastId}`);
      const podcastInfo = await req.json();
      console.log(podcastInfo);
      setPodcast(podcastInfo.podcast.feed);
      setEpisodes(podcastInfo.episodes.items);
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
        <IonGrid>
          <IonRow>
            <IonCol sizeSm='6' offsetSm='3'>
              <IonCard color='dark'>
                <img src={podcast?.artwork} />
                <IonCardHeader>
                  <IonCardTitle>{podcast?.title}</IonCardTitle>
                  <IonCardSubtitle>{podcast?.description}</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <h2>Episodes</h2>
            {episodes &&
              episodes.map((epi) => (
                <IonCard color='dark' className='ion-no-margin' key={epi.id}>
                  <IonCardHeader>
                    <IonCardTitle>{epi.title}</IonCardTitle>
                    <IonCardSubtitle>{epi.description}</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default PodcastInfo;
