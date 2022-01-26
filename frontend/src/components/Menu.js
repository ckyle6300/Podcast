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
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  searchOutline,
  searchSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from 'ionicons/icons';
import './Menu.css';
import { useEffect, useState } from 'react';
import LocStorage from '../utils/storage-model';

const appPages = [
  {
    title: 'Find Podcasts',
    url: '/podcasts/search',
    iosIcon: searchOutline,
    mdIcon: searchSharp,
  },
  {
    title: 'Inbox',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
];

const Menu = () => {
  const location = useLocation();
  const [podcastList, setPodcastList] = useState([]);

  useEffect(() => {
    const getPods = async () => {
      const pods = await LocStorage.getStorage('PodcastList');
      console.log(pods);
      setPodcastList(pods);
    };

    getPods();
  }, []);

  return (
    <IonMenu contentId='main' type='overlay'>
      <IonContent>
        <IonList id='inbox-list'>
          <IonListHeader>Podcasts</IonListHeader>
          {/* <IonNote>hi@ionicframework.com</IonNote> */}
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
                  <IonImg src={podcast.artwork} />
                </IonAvatar>
                <IonLabel>{podcast.title}</IonLabel>
              </IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
