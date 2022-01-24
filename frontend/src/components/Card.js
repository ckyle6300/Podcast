import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import { useHistory } from 'react-router';

const Card = ({ podcast, clicker, address }) => {
  const history = useHistory();

  if (!clicker) {
    return (
      <IonCard color='dark' className='ion-text-center'>
        <img src={podcast?.artwork} />
        <IonCardHeader>
          <IonCardTitle>{podcast?.title}</IonCardTitle>
          {podcast.description && (
            <IonCardSubtitle>{podcast?.description}</IonCardSubtitle>
          )}
        </IonCardHeader>
      </IonCard>
    );
  }

  return (
    <IonCard
      color='dark'
      className='ion-text-center'
      onClick={() => history.push(address)}
    >
      <img src={podcast?.artwork} />
      <IonCardHeader>
        <IonCardTitle>{podcast?.title}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default Card;
