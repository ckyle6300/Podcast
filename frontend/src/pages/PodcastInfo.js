import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'shikwasa/dist/shikwasa.min.css';
import 'shikwasa/dist/shikwasa.chapter.css';
import { addCircle, addCircleOutline, playOutline } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { playEpisode } from '../store/podcastInfoSlice';
import { useSelector } from 'react-redux';

function parseSecondsIntoReadableTime(milliseconds) {
  //Get hours from seconds
  const hours = milliseconds / (60 * 60);
  const absoluteHours = Math.floor(hours);
  const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);
  const m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  return h + ':' + m + ':' + s;
}

const PodcastInfo = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState();
  const [episodes, setEpisodes] = useState([]);
  const podInfo = useSelector((state) => state.podcastInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const getPodcastInfo = async () => {
      const req = await fetch(`http://localhost:5100/podcast/${podcastId}`);
      const podcastInfo = await req.json();

      setPodcast(podcastInfo.podcast.feed);
      setEpisodes(podcastInfo.episodes.items);
    };
    getPodcastInfo();
  }, []);

  const buttonHandler = async (idx) => {
    const episode = episodes[idx];

    const data = await fetch('http://localhost:5100/podcast/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chapterUrl: episode.chaptersUrl }),
    });

    const chp = await data.json();

    if (podInfo.count === 0) {
      dispatch(
        playEpisode.newPodcast({ pod: podcast, epi: episode, chapters: chp })
      );
    } else {
      dispatch(
        playEpisode.updatePodcast({ pod: podcast, epi: episode, chapters: chp })
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary' className='ion-text-center'>
          <IonButtons slot='start'>
            <IonMenuButton />
            <IonBackButton defaultHref='search' />
          </IonButtons>
          <IonButtons slot='end'>
            <IonIcon
              icon={addCircleOutline}
              size='large'
              style={{ marginRight: '1rem' }}
            />
          </IonButtons>
          <IonTitle>{podcast ? podcast.title : ''}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='secondary'>
        <IonGrid>
          <IonRow>
            <IonCol className='ion-no-padding' sizeSm='6' offsetSm='3'>
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
            <IonCol sizeSm='10' offsetSm='1'>
              <IonList className='ion-no-padding'>
                <IonListHeader color='dark'>
                  <h1 className='ion-text-center'>Episodes</h1>
                </IonListHeader>
                {episodes &&
                  episodes.map((epi, idx) => (
                    <IonItem color='dark' key={idx}>
                      <IonAvatar slot='start'>
                        <IonImg src={epi.feedImage} />
                      </IonAvatar>
                      <IonLabel className='ion-text-wrap'>
                        <h1>{epi.title}</h1>
                        <h2>{epi.datePublishedPretty}</h2>
                        {epi.duration > 0 && (
                          <p>{parseSecondsIntoReadableTime(epi.duration)}</p>
                        )}
                      </IonLabel>
                      <IonIcon
                        slot='end'
                        button
                        icon={playOutline}
                        onClick={() => buttonHandler(idx)}
                      />
                    </IonItem>
                  ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PodcastInfo;
