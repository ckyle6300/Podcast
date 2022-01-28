import React from 'react';
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import 'shikwasa/dist/shikwasa.min.css';
import Shikwasa from 'shikwasa';
import Chapter from 'shikwasa/dist/shikwasa.chapter.cjs';
import 'shikwasa/dist/shikwasa.chapter.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './Layout.module.css';

const Layout = (props) => {
  const podInfo = useSelector((state) => state.podcastInfo);
  const { episode, podcast, count, chapters } = podInfo;
  const [player, setPlayer] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const runCode = async () => {
      if (count === 10) {
        try {
          const TAudio = {
            src: episode.enclosureUrl,
            cover: episode.feedImage,
            title: episode.title,
            artist: podcast.title,
            duration: episode.duration,
            chapters: chapters.map((chap, i) => {
              if (i === chapters.length - 1) {
                return { ...chap, endTime: episode.duration };
              }

              return { ...chap, endTime: chapters[i + 1].startTime };
            }),
          };
          await player.update(TAudio);
        } catch (err) {
          console.log(err);
        }
        return;
      }

      if (count === 5) {
        setShow(true);
        await Shikwasa.use(Chapter);
        try {
          setPlayer(
            await new Shikwasa({
              container: document.getElementById('players'),
              audio: {
                src: episode.enclosureUrl,
                cover: episode.feedImage,
                title: episode.title,
                artist: podcast.title,
                duration: episode.duration,
                chapters: chapters.map((chap, i) => {
                  if (i === chapters.length - 1) {
                    return { ...chap, endTime: episode.duration };
                  }

                  return { ...chap, endTime: chapters[i + 1].startTime };
                }),
              },
              theme: 'dark',
              speedOptions: [0.75, 1, 1.25, 1.5, 1.75, 2, 2.25],
              autoplay: true,
            })
          );
        } catch (error) {
          console.log(error, 'hello');
        }
      }
    };

    runCode();
  }, [episode]);

  return (
    <>
      <IonContent>{props.children}</IonContent>
      <IonFooter
        collapse='fade'
        className={styles.foot}
        id='players'
      ></IonFooter>
    </>
  );
};
export default React.memo(Layout);
