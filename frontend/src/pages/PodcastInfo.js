import {
  IonBackButton,
  IonButtons,
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
import Chapter from 'shikwasa/dist/shikwasa.chapter.cjs';
import 'shikwasa/dist/shikwasa.chapter.css';

// export interface Episode {
//   chapterUrl: string;
//   datePublished: number;
//   datePublishedPretty: string;
//   description: string;
//   duration: number;
//   enclosureLength: number;
//   enclosureType: number;
//   enclosureUrl: string;
//   episode: number | null;
//   feedId: number;
//   feedImage: string;
//   id: number;
//   image: string;
//   link: string;
//   title: string;
//   season: number;
//   transcriptUrl: string | null;
// }

const PodcastInfo = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState();
  const [episodes, setEpisodes] = useState([]);

  console.log(podcastId);
  let player;

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

  let podInfo;

  const buttonHandler = async (idx) => {
    if (podInfo != episodes[idx] && podInfo !== undefined) {
      podInfo = episodes[idx];
      const data = await fetch('http://localhost:5100/podcast/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterUrl: podInfo.chaptersUrl }),
      });

      const chp = await data.json();
      const TAudio = {
        src: podInfo.enclosureUrl,
        cover: podInfo.image,
        title: podInfo.title,
        artist: podcast.author,
        duration: podInfo.duration,
        chapters: chp,
      };
      player.update(TAudio);
      return;
    }

    podInfo = episodes[idx];
    const data = await fetch('http://localhost:5100/podcast/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chapterUrl: podInfo.chaptersUrl }),
    });

    const chp = await data.json();

    Shikwasa.use(Chapter);
    player = new Shikwasa({
      container: () => document.getElementById('players'),
      audio: {
        title: podInfo.title,
        artist: podInfo.episode,
        cover: podInfo.image,
        src: podInfo.enclosureUrl,
        chapters: chp,
      },
      theme: 'dark',
      speedOptions: [0.75, 1, 1.25, 1.5, 1.75, 2, 2.25],
      autoplay: true,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary' className='ion-text-center'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='search' />
          </IonButtons>
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
