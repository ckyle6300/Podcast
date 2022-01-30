import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

const NotFound = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary' className='ion-text-center'>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>404</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='secondary' className='ion-text-center'>
        <h1>No page found...</h1>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
