import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Episodes from '../components/Episodes';
import { playEpisode } from '../store/podcastInfoSlice';

const RecentEpisodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const podList = useSelector((state) => state.localStore.podcastsRdx);
  const podInfo = useSelector((state) => state.podcastInfo);
  const dispatch = useDispatch();

  useEffect(async () => {
    const getRecent = async () => {
      const podcastIds = Object.keys(podList);
      const data = await fetch('http://localhost:5100/podcast/recent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ podcastIds: podcastIds }),
      });

      const epi = await data.json();
      setEpisodes(epi.items);
    };

    getRecent();
  }, [podList]);

  const buttonHandler = async (idx) => {
    const episode = episodes[idx];

    const podcast = podList[episode.feedId];

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
        playEpisode.updatePodcast({
          pod: podcast,
          epi: episode,
          chapters: chp,
        })
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary' className='ion-text-center'>
          <IonTitle>Recent Podcasts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='secondary'>
        <IonGrid>
          <IonRow>
            <IonCol sizeSm='10' offsetSm='1'>
              <IonList className='ion-no-padding'>
                <IonListHeader color='dark'>
                  <h1>Recent Episodes</h1>
                </IonListHeader>
                {episodes &&
                  episodes.map((epi, idx) => (
                    <Episodes
                      key={idx}
                      epi={epi}
                      buttonHandler={buttonHandler}
                      idx={idx}
                    />
                  ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RecentEpisodes;
