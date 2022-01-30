import React from 'react';
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
import { closeOutline, playOutline } from 'ionicons/icons';
import parse from 'html-react-parser';
import { parseSecondsIntoReadableTime } from './Episodes';

const EpisodeModal = ({ isOpen, setIsOpen, buttonHandler, modalInfo }) => {
  if (!modalInfo) {
    return <></>;
  }
  const { epi, idx, podTitle } = modalInfo;
  // use transcript
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

  return (
    <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>{epi?.title}</IonTitle>
          <IonButtons slot='end'>
            <IonButton
              fill='clear'
              color='dark'
              onClick={() => setIsOpen(false)}
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
                  <h2>{epi?.title}</h2>
                  <h3>{epi?.datePublishedPretty}</h3>
                  {epi?.duration > 0 && (
                    <p>{parseSecondsIntoReadableTime(epi?.duration)}</p>
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
          <IonRow className='ion-padding '>
            <IonCol>{parse(epi?.description)}</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default React.memo(EpisodeModal);
