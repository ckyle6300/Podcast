import {
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

  console.log('hello');
  console.log(userSearch);

  useEffect(() => {
    const getUrl = async () => {
      const data = await fetch('http://localhost:5100/podcast/search', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: userSearch }),
      });
      const parsedDate = await data.json();
      console.log(parsedDate);
    };

    let searchTimer: any;

    if (userSearch.length > 3) {
      searchTimer = setTimeout(getUrl, 2000);
    }

    return () => clearTimeout(searchTimer);
  }, [userSearch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search Podcasts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeSm='6' offsetSm='3'>
              <IonItem>
                <IonLabel position='floating'>Search</IonLabel>
                <IonInput
                  value={userSearch}
                  onIonChange={(e) => setUserSearch(e.detail.value!)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Search;
