import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
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
import { sendPodcastData } from '../store/selectedPodcast';

const PodcastInfo = () => {
  const { podcastId } = useParams();
  const podInfo = useSelector((state) => state.podcastInfo);
  const podList = useSelector((state) => state.localStore.podcastsRdx);
  const selectedPodcast = useSelector((state) => state.selected);
  const [isOpen, setIsOpen] = useState(false);
  const [favorite, setFavorite] = useState();
  const [loading, setLoading] = useState(true);
  const [visibleEpi, setVisibleEpi] = useState([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const modalRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const getPodcastInfo = async () => {
      await dispatch(sendPodcastData(podcastId));
    };
    getPodcastInfo();
    return () => {
      setFavorite(false);
      setLoading(true);
      setVisibleEpi([]);
    };
  }, [podcastId]);

  useEffect(() => {
    setFavorite(!!podList[podcastId]);
    setLoading(false);
    setVisibleEpi(selectedPodcast.episodes.slice(0, 10));
  }, [selectedPodcast]);

  const buttonHandler = async (idx) => {
    const episode = selectedPodcast.episodes[idx];

    const data = await fetch('http://localhost:5100/podcast/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chapterUrl: episode.chaptersUrl }),
    });

    const chp = await data.json();

    if (podInfo.count === 0) {
      dispatch(
        playEpisode.newPodcast({
          pod: selectedPodcast.podcast,
          epi: selectedPodcast.episodes,
          chapters: chp,
        })
      );
    } else {
      dispatch(
        playEpisode.updatePodcast({
          pod: selectedPodcast.podcast,
          epi: selectedPodcast.episodes,
          chapters: chp,
        })
      );
    }
  };

  const clickHandler = (epi, idx) => {
    setIsOpen((prev) => !prev);
    modalRef.current = {
      epi: epi,
      idx: idx,
      podTitle: selectedPodcast.podcast.title,
    };
  };

  const addPodcast = async () => {
    const podcastList = { ...podList };
    if (!favorite) {
      podcastList[selectedPodcast.podcast.id] = selectedPodcast.podcast;
    } else {
      delete podcastList[selectedPodcast.podcast.id];
    }
    LocStorage.add('PodcastList', podcastList);
    dispatch(localRdx.updatePodcastList({ value: podcastList }));
    setFavorite((prev) => !prev);
  };

  let data;
  if (selectedPodcast.episodes.length > 0) {
    data = [...selectedPodcast.episodes];
  }

  const pushData = () => {
    const max = visibleEpi.length + 10;
    const min = max - 10;
    const newData = [];
    for (let i = min; i < max; i++) {
      console.log(data);
      try {
        newData.push(data[i]);
      } catch (error) {}
    }
    setVisibleEpi((prev) => [...prev, ...newData]);
  };

  const loadData = (ev) => {
    setTimeout(() => {
      pushData();
      console.log('Loaded data');
      ev.target.complete();
      if (visibleEpi.length == selectedPodcast.episodes.length) {
        setInfiniteDisabled(true);
      }
    }, 200);
  };

  useIonViewWillEnter(() => {
    pushData();
  });

  console.log(selectedPodcast);
  console.log(visibleEpi);
  console.log(loading);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary' className='ion-text-center'>
          <IonButtons slot='start'>
            <IonMenuButton />
            <IonBackButton defaultHref='/search' />
          </IonButtons>
          <IonButtons slot='end'>
            <IonIcon
              icon={favorite ? addCircle : addCircleOutline}
              size='large'
              style={{ marginRight: '1rem' }}
              onClick={addPodcast}
            />
          </IonButtons>
          <IonTitle>
            {selectedPodcast.podcast ? selectedPodcast.podcast.title : ''}
          </IonTitle>
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
            {selectedPodcast.podcast.length !== 0 && (
              <IonRow>
                <IonCol className='ion-no-padding' sizeSm='5' offsetSm='3.5'>
                  <Card podcast={selectedPodcast.podcast} />
                </IonCol>
              </IonRow>
            )}
            {selectedPodcast.episodes.length !== 0 && (
              <IonRow>
                <IonCol sizeSm='8' offsetSm='2'>
                  <IonList className='ion-no-padding'>
                    <IonListHeader color='dark'>
                      <h1 className='ion-text-center'>Episodes</h1>
                    </IonListHeader>
                    {visibleEpi.map((epi, idx) => (
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
            )}
            <IonInfiniteScroll
              onIonInfinite={loadData}
              threshold='300px'
              disabled={isInfiniteDisabled}
            >
              <IonInfiniteScrollContent
                loadingSpinner='bubbles'
                loadingText='Loading more data...'
              />
            </IonInfiniteScroll>
            <EpisodeModal
              isOpen={isOpen}
              modalInfo={modalRef.current}
              setIsOpen={setIsOpen}
              buttonHandler={buttonHandler}
            />
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(PodcastInfo);
