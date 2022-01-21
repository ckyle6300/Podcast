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
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { IPod } from './Search';
import 'shikwasa/dist/shikwasa.min.css';
import Shikwasa from 'shikwasa';

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
  let player: any;

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

  let podInfo: any;

  const buttonHandler = (idx: number) => {
    if (podInfo) {
      player.update({
        title: podInfo.title,
        artist: podInfo.episode,
        cover: podInfo.image,
        src: podInfo.enclosureUrl,
        themeColor: '#000',
      });
    }
    podInfo = episodes[idx];
    console.log(podInfo);
    player = new Shikwasa({
      container: () => document.getElementById('players'),
      audio: {
        title: podInfo.title,
        artist: podInfo.episode,
        cover: podInfo.image,
        src: podInfo.enclosureUrl,
      },
    });
  };

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
          <h2>Episodes</h2>
          <IonRow>
            {episodes &&
              episodes.map((epi, idx) => (
                <IonCard
                  button
                  onClick={() => buttonHandler(idx)}
                  color='dark'
                  style={{ width: '100%' }}
                  className='ion-no-margin'
                  key={idx}
                >
                  <IonCardHeader>
                    <IonCardTitle>{epi.title}</IonCardTitle>
                    <IonCardSubtitle>{epi.description}</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter id='players'></IonFooter>
    </IonPage>
  );
};

export default PodcastInfo;
