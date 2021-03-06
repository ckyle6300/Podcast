import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  caretForwardOutline,
  headset,
  searchOutline,
  searchSharp,
} from 'ionicons/icons';
import './Menu.css';
import React, { useEffect } from 'react';
import LocStorage from '../utils/storage-model';
import { useDispatch, useSelector } from 'react-redux';
import { localRdx } from '../store/local-storage';

const appPages = [
  {
    title: 'Find Podcasts',
    url: '/search',
    iosIcon: searchOutline,
    mdIcon: searchSharp,
  },
  {
    title: 'My Podcasts',
    url: '/mypodcasts',
    iosIcon: headset,
    mdIcon: headset,
  },
  {
    title: 'Recent Episodes',
    url: '/mypodcasts/episodes',
    iosIcon: caretForwardOutline,
    mdIcon: caretForwardOutline,
  },
];

const Menu = () => {
  const location = useLocation();
  const podcastList = useSelector((state) => state.localStore.podcastsRdx);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPods = async () => {
      const pods = await LocStorage.getStorage('PodcastList');

      dispatch(localRdx.updatePodcastList({ value: pods }));
    };

    getPods();
  }, [dispatch]);

  return (
    <IonMenu contentId='main' type='overlay' swipeGesture={true}>
      <IonContent>
        <IonList id='inbox-list'>
          <IonListHeader>Podcasts</IonListHeader>
          <IonNote>Podcasting 2.0</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? 'selected' : ''
                  }
                  routerLink={appPage.url}
                  routerDirection='none'
                  lines='none'
                  detail={false}
                >
                  <IonIcon
                    slot='start'
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id='labels-list'>
          <IonListHeader>Subscribed Podcasts</IonListHeader>
          {podcastList &&
            Object.values(podcastList).map((podcast, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  lines='none'
                  key={index}
                  className={
                    location.pathname === `/podcasts/${podcast.id}`
                      ? 'selected'
                      : ''
                  }
                  routerLink={`/podcasts/${podcast.id}`}
                  routerDirection='none'
                  lines='none'
                  detail={false}
                >
                  <IonAvatar slot='start'>
                    <IonImg src={podcast.artwork} alt='podcast image' />
                  </IonAvatar>
                  <IonLabel>{podcast.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default React.memo(Menu);
