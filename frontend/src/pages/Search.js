import {
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Layout from './Layout';

const Search = () => {
  const [userSearch, setUserSearch] = useState('');
  const [podcasts, setPodcasts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getUrl = async () => {
      const data = await fetch('http://localhost:5100/podcast/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: userSearch }),
      });
      const parsedData = await data.json();
      setPodcasts(parsedData.feeds);
    };

    let searchTimer;

    if (userSearch.length >= 3) {
      searchTimer = setTimeout(getUrl, 1500);
    }

    return () => clearTimeout(searchTimer);
  }, [userSearch]);

  console.log('going again');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary' className='ion-text-center'>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Search Podcasts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='secondary'>
        <IonGrid>
          <IonRow className='ion-padding-top'>
            <IonCol sizeSm='6' offsetSm='3'>
              <IonItem>
                <IonLabel color='dark' position='floating'>
                  Search
                </IonLabel>
                <IonInput
                  minlength={3}
                  autofocus={true}
                  value={userSearch}
                  onIonChange={(e) => setUserSearch(e.detail.value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            {podcasts.map((podcast, index) => (
              <IonCol size='6' sizeSm='4' key={index}>
                <IonCard
                  className='ion-text-center'
                  onClick={() => history.push(`/podcasts/${podcast.id}`)}
                  color='dark'
                >
                  <img src={podcast.artwork} />
                  <IonCardHeader className='ion-no-padding'>
                    <IonCardTitle>{podcast.title}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Search;
