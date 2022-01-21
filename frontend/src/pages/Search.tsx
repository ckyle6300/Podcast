import {
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { ChangeEvent, useEffect, useState } from 'react';

const Search: React.FC = () => {
  const [userSearch, setUserSearch] = useState<string>('');
  const [podcasts, setPodcasts] = useState([]);

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

    let searchTimer: any;

    if (userSearch.length > 3) {
      searchTimer = setTimeout(getUrl, 1500);
    }

    return () => clearTimeout(searchTimer);
  }, [userSearch]);

  console.log(podcasts);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
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
                  value={userSearch}
                  onIonChange={(e) => setUserSearch(e.detail.value!)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            {podcasts.map((podcast, index) => (
              <IonCol size='6' key={index}>
                <IonCard className='ion-text-center' color='dark'>
                  <img src={podcast.artwork} />
                  <IonCardTitle>{podcast.title}</IonCardTitle>
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
