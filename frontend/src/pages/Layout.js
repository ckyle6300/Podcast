import { IonContent, IonFooter, IonPage } from '@ionic/react';
import 'shikwasa/dist/shikwasa.min.css';
import Shikwasa from 'shikwasa';
import Chapter from 'shikwasa/dist/shikwasa.chapter.cjs';
import 'shikwasa/dist/shikwasa.chapter.css';

const Layout = (props) => {
  // Shikwasa.use(Chapter);
  // player = new Shikwasa({
  //   container: () => document.getElementById('players'),
  //   audio: {
  //     title: podInfo.title,
  //     artist: podInfo.episode,
  //     cover: podInfo.image,
  //     src: podInfo.enclosureUrl,
  //     chapters: chp,
  //   },
  //   theme: 'dark',
  //   speedOptions: [0.75, 1, 1.25, 1.5, 1.75, 2, 2.25],
  //   autoplay: true,
  // });

  return (
    <IonPage>
      <IonContent>{props.children}</IonContent>
      <IonFooter id='players' />
    </IonPage>
  );
};

export default Layout;
