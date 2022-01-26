import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { addCircle, addCircleOutline } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { playEpisode } from '../store/podcastInfoSlice';
import { useSelector } from 'react-redux';
import LocStorage from '../utils/storage-model';
import Card from '../components/Card';
import Episodes from '../components/Episodes';
import EpisodeModal from '../components/EpisodeModal';
import { localRdx } from '../store/local-storage';

const PodcastInfo = () => {
  const { podcastId } = useParams();
  const podInfo = useSelector((state) => state.podcastInfo);
  const podList = useSelector((state) => state.localStore.podcastsRdx);
  const [podcast, setPodcast] = useState();
  const [episodes, setEpisodes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [favorite, setFavorite] = useState();
  const modalRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const getPodcastInfo = async () => {
      const req = await fetch(`http://localhost:5100/podcast/${podcastId}`);
      const podcastInfo = await req.json();
      setPodcast(podcastInfo.podcast.feed);
      setEpisodes(podcastInfo.episodes.items);
      setFavorite(!!podList[podcastId]);
    };
    getPodcastInfo();
  }, [podcastId]);

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

  const clickHandler = (epi, idx) => {
    setIsOpen((prev) => !prev);
    modalRef.current = {
      epi: epi,
      idx: idx,
      podTitle: podcast.title,
    };
  };

  const addPodcast = async () => {
    const podcastList = { ...podList };
    if (!favorite) {
      podcastList[podcast.id] = podcast;
    } else {
      delete podcastList[podcast.id];
    }
    LocStorage.add('PodcastList', podcastList);
    dispatch(localRdx.updatePodcastList({ value: podcastList }));
    setFavorite((prev) => !prev);
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
              icon={favorite ? addCircle : addCircleOutline}
              size='large'
              style={{ marginRight: '1rem' }}
              onClick={addPodcast}
            />
          </IonButtons>
          <IonTitle>{podcast ? podcast.title : ''}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='secondary'>
        <IonGrid>
          <IonRow>
            <IonCol className='ion-no-padding' sizeSm='6' offsetSm='3'>
              {podcast && <Card podcast={podcast} />}
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
                    <Episodes
                      key={idx}
                      epi={epi}
                      buttonHandler={buttonHandler}
                      idx={idx}
                      clickHandler={clickHandler}
                    />
                  ))}
              </IonList>
            </IonCol>
          </IonRow>
          <EpisodeModal
            isOpen={isOpen}
            modalInfo={modalRef.current}
            setIsOpen={setIsOpen}
            buttonHandler={buttonHandler}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PodcastInfo;
