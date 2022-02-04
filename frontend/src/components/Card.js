import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from '@ionic/react';
import { useHistory } from 'react-router';
import React from 'react';
import styles from './Card.module.css';

const Card = ({ podcast, clicker, address }) => {
  let content;

  if (!clicker) {
    content = (
      <IonCard color='dark' className='ion-text-center'>
        <IonImg
          src={podcast?.artwork}
          alt={`${podcast.title}`}
          className={styles.image}
        />
        <IonCardHeader>
          <IonCardTitle>{podcast?.title}</IonCardTitle>
          {podcast.description && (
            <IonCardSubtitle>{podcast?.description}</IonCardSubtitle>
          )}
          {podcast.funding && (
            <p>
              {podcast.funding.message} :{' '}
              <a target='_blank' href={podcast.funding.url}>
                {podcast.funding.url}
              </a>
            </p>
          )}
        </IonCardHeader>
      </IonCard>
    );
  } else {
    content = (
      <IonCard
        color='dark'
        className='ion-text-center'
        routerLink={`/podcasts/${podcast.id}`}
      >
        <img src={podcast?.artwork} alt={`${podcast.title}`} />
        <IonCardHeader>
          <IonCardTitle>{podcast?.title}</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    );
  }

  return <>{content}</>;
};

export default React.memo(Card);
