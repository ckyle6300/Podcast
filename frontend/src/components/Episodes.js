import { IonAvatar, IonIcon, IonImg, IonItem, IonLabel } from '@ionic/react';
import { playOutline } from 'ionicons/icons';

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

const Episodes = ({ epi, buttonHandler, idx }) => {
  return (
    <IonItem color='dark'>
      <IonAvatar slot='start'>
        <IonImg src={epi.feedImage} />
      </IonAvatar>
      <IonLabel className='ion-text-wrap'>
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
  );
};

export default Episodes;
