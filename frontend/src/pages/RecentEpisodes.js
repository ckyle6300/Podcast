import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EpisodeModal from '../components/EpisodeModal';
import Episodes from '../components/Episodes';
import { playEpisode } from '../store/podcastInfoSlice';
import { SpinnerTypes } from '@ionic/react';

const RecentEpisodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const podList = useSelector((state) => state.localStore.podcastsRdx);
  const podInfo = useSelector((state) => state.podcastInfo);

  const modalRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const getRecent = async () => {
      const podcastIds = Object.keys(podList);
      const data = await fetch('http://localhost:5100/podcast/recent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ podcastIds: podcastIds }),
      });

      const epi = await data.json();
      setEpisodes(epi.items);
      setLoading(false);
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

  const clickHandler = (epi, idx) => {
    const episode = episodes[idx];
    const podcast = podList[episode.feedId];
    setIsOpen((prev) => !prev);
    modalRef.current = {
      epi: epi,
      idx: idx,
      podTitle: podcast.title,
    };
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary' className='ion-text-center'>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Recent Podcasts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='secondary'>
        {loading && (
          <IonLoading
            isOpen={loading}
            onDidDismiss={() => setLoading(false)}
            message={'Loading...'}
            duration={5000}
          />
        )}
        {!loading && (
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
                        clickHandler={clickHandler}
                        idx={idx}
                      />
                    ))}
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
        <EpisodeModal
          isOpen={isOpen}
          modalInfo={modalRef.current}
          setIsOpen={setIsOpen}
          buttonHandler={buttonHandler}
        />
      </IonContent>
    </IonPage>
  );
};

export default RecentEpisodes;