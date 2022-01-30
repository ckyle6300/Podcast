import {
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Card from '../components/Card';
import React, { useEffect, useState } from 'react';

const MyPodcasts = () => {
  const podcastList = useSelector((state) => state.localStore.podcastsRdx);
  const [podcasts, setPodcasts] = useState();
  const history = useHistory();
  const searching = () => {
    history.push('/search');
  };

  useEffect(() => {
    setPodcasts(Object.values(podcastList));
  }, []);

  const loading = Object.keys(podcastList);

  console.log(podcasts);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary' className='ion-text-center'>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Subscribed Podcasts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='secondary'>
        {!podcasts && (
          <IonLoading isOpen={true} message={'Loading...'} duration={5000} />
        )}
        {podcasts && (
          <IonGrid>
            <IonRow>
              {podcasts &&
                podcasts.map((podcast, index) => (
                  <IonCol
                    size='6'
                    sizeSm='4'
                    key={index}
                    className='ion-no-padding'
                  >
                    <Card
                      podcast={podcast}
                      clicker={true}
                      address={`/podcasts/${podcast.id}`}
                    />
                  </IonCol>
                ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
      <IonFab
        vertical='bottom'
        horizontal='end'
        slot='fixed'
        className='ion-padding'
      >
        <IonFabButton onClick={searching}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default React.memo(MyPodcasts);
