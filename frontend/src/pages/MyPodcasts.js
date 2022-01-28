import {
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
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

const MyPodcasts = () => {
  const podcastList = useSelector((state) => state.localStore.podcastsRdx);
  const history = useHistory();
  const searching = () => {
    history.push('/search');
  };
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
        <IonGrid>
          <IonRow>
            {podcastList &&
              Object.values(podcastList).map((podcast, index) => (
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

export default MyPodcasts;
