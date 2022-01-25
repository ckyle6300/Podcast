import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { playOutline, closeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

function parseSecondsIntoReadableTime(milliseconds) {
  //Get hours from seconds
  const hours = milliseconds / (60 * 60);
  const absoluteHours = Math.floor(hours);
  const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);
  const m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  return h + ':' + m + ':' + s;
}

const Episodes = ({ epi, buttonHandler, idx, podTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(epi.description);
  // useEffect(async () => {
  //   fetch(epi.transcriptUrl)
  //     .then((response) => response.body)
  //     .then((rb) => {
  //       const reader = rb.getReader();

  //       return new ReadableStream({
  //         start(controller) {
  //           // The following function handles each data chunk
  //           function push() {
  //             // "done" is a Boolean and value a "Uint8Array"
  //             reader.read().then(({ done, value }) => {
  //               // If there is no more data to read
  //               if (done) {
  //                 console.log('done', done);
  //                 controller.close();
  //                 return;
  //               }
  //               // Get the data and send it to the browser via the controller
  //               controller.enqueue(value);
  //               // Check chunks by logging to the console
  //               console.log(done, value);
  //               push();
  //             });
  //           }

  //           push();
  //         },
  //       });
  //     })
  //     .then((stream) => {
  //       // Respond with our stream
  //       return new Response(stream, {
  //         headers: { 'Content-Type': 'text/html' },
  //       }).text();
  //     })
  //     .then((result) => {
  //       // Do things with result
  //       console.log(result);
  //     });
  // }, []);

  const description = new DOMParser().parseFromString(
    epi.description,
    'text/xml'
  );

  return (
    <>
      <IonItem color='dark'>
        <IonAvatar slot='start'>
          <IonImg src={epi.feedImage} />
        </IonAvatar>
        <IonLabel
          className='ion-text-wrap'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <h2>{epi.title}</h2>
          <h3>{epi.datePublishedPretty}</h3>
          {epi.duration > 0 && (
            <p>{parseSecondsIntoReadableTime(epi.duration)}</p>
          )}
        </IonLabel>
        <IonIcon
          slot='end'
          button
          icon={playOutline}
          onClick={() => buttonHandler(idx)}
        />
      </IonItem>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonTitle>{epi.title}</IonTitle>
            <IonButtons slot='end'>
              <IonButton
                fill='clear'
                color='dark'
                onClick={() => setIsOpen((prev) => !prev)}
              >
                close
                <IonIcon slot='end' icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent color='secondary'>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem color='dark'>
                  <IonAvatar slot='start'>
                    <IonImg src={epi.feedImage} />
                  </IonAvatar>
                  <IonLabel className='ion-text-wrap'>
                    <p>{podTitle}</p>
                    <h2>{epi.title}</h2>
                    <h3>{epi.datePublishedPretty}</h3>
                    {epi.duration > 0 && (
                      <p>{parseSecondsIntoReadableTime(epi.duration)}</p>
                    )}
                  </IonLabel>
                  <IonIcon
                    slot='end'
                    button
                    icon={playOutline}
                    onClick={() => buttonHandler(idx)}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            {parse(epi.description)}
          </IonGrid>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Episodes;
