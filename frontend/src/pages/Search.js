import {
  IonButtons,
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
import React, { useEffect, useState } from 'react';
import { searchActions } from '../store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';

const Search = () => {
  // const inputSearch = useSelector((state) => state.search);
  const [userSearch, setUserSearch] = useState('');
  const [podcasts, setPodcasts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUrl = async () => {
      const data = await fetch('http://localhost:5100/podcast/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: userSearch }),
      });
      const parsedData = await data.json();

      setPodcasts(parsedData.feeds);
      // dispatch(searchActions.updateSearch({ value: userSearch }));
      // dispatch(searchActions.updatePodcasts({ pods: parsedData.feeds }));
    };

    let searchTimer;

    if (userSearch.length >= 3) {
      searchTimer = setTimeout(getUrl, 700);
    }

    return () => clearTimeout(searchTimer);
  }, [userSearch, dispatch]);

  console.log(podcasts);
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
    </IonPage>
  );
};

export default React.memo(Search);
