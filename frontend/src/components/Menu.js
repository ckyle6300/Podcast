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
import { Storage } from '@capacitor/storage';

// interface AppPage {
//   url: string;
//   iosIcon: string;
//   mdIcon: string;
//   title: string;
// }

const appPages = [
  {
    title: 'Find Podcasts',
    url: '/podcasts/search',
    iosIcon: searchOutline,
    mdIcon: searchSharp,
  },
  // {
  //   title: 'Inbox',
  //   url: '/page/Inbox',
  //   iosIcon: mailOutline,
  //   mdIcon: mailSharp,
  // },
  // {
  //   title: 'Outbox',
  //   url: '/page/Outbox',
  //   iosIcon: paperPlaneOutline,
  //   mdIcon: paperPlaneSharp,
  // },
  // {
  //   title: 'Favorites',
  //   url: '/page/Favorites',
  //   iosIcon: heartOutline,
  //   mdIcon: heartSharp,
  // },
  // {
  //   title: 'Archived',
  //   url: '/page/Archived',
  //   iosIcon: archiveOutline,
  //   mdIcon: archiveSharp,
  // },
  // {
  //   title: 'Trash',
  //   url: '/page/Trash',
  //   iosIcon: trashOutline,
  //   mdIcon: trashSharp,
  // },
  // {
  //   title: 'Spam',
  //   url: '/page/Spam',
  //   iosIcon: warningOutline,
  //   mdIcon: warningSharp,
  // },
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu = () => {
  const location = useLocation();
  const [podcastList, setPodcastList] = useState([]);

  useEffect(() => {
    const getPodcasts = async () => {
      const { value } = await Storage.get({ key: 'PodcastList' });
      let podcastlist = await JSON.parse(value);
      setPodcastList(podcastlist);
    };

    getPodcasts();
  }, []);

  console.log(podcastList);

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
          <IonListHeader>SubScribed Podcasts</IonListHeader>
          {podcastList.map((podcast, index) => (
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
