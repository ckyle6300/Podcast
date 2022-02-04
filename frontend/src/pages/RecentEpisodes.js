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
import { playEpisode, playPodcast } from '../store/podcastInfoSlice';
import { updateRecent } from '../store/selectedPodcast';

const RecentEpisodes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const podList = useSelector((state) => state.localStore.podcastsRdx);
  const podInfo = useSelector((state) => state.podcastInfo);
  const episodes = useSelector((state) => state.selected.recentEpisodes);

  const modalRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const getRecent = async () => {
      let podcastIds;
      try {
        podcastIds = Object.keys(podList);
      } catch (error) {
        setError(true);
        setLoading(false);
        return;
      }

      await dispatch(updateRecent(podcastIds));
      setLoading(false);
    };

    getRecent();

    return () => {
      setError(false);
      setLoading(true);
    };
  }, [podList]);

  const buttonHandler = async (idx) => {
    const episode = episodes[idx];
    const podcast = podList[episode.feedId];
    dispatch(playPodcast(podcast, episode, podInfo.count));
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
        {!loading && (error || episodes == undefined) && (
          <div className='ion-text-center ion-padding top'>
            <h2>Subscribe to a podcast to see recent episodes.</h2>
          </div>
        )}
        {!loading && !error && episodes !== undefined && (
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
