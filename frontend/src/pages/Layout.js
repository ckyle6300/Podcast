import React, { useMemo } from 'react';
import { IonFooter } from '@ionic/react';
import 'shikwasa/dist/shikwasa.min.css';
import Shikwasa from 'shikwasa';
import Chapter from 'shikwasa/dist/shikwasa.chapter.cjs';
import 'shikwasa/dist/shikwasa.chapter.css';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

const Layout = (props) => {
  const podInfo = useSelector((state) => state.podcastInfo);
  const { episode, chp, podcast, count } = podInfo;
  const [player, setPlayer] = useState();

  useEffect(() => {
    if (count === 10) {
      try {
        const TAudio = {
          src: episode.enclosureUrl,
          cover: episode.image,
          title: episode.title,
          artist: podcast.title,
          duration: episode.duration,
        };
        player.update(TAudio);
      } catch (err) {
        console.log(err);
      }
      return;
    }

    if (count === 5) {
      setPlayer(
        new Shikwasa({
          container: document.getElementById('players'),
          audio: {
            src: episode.enclosureUrl,
            cover: episode.image,
            title: episode.title,
            artist: podcast.title,
            duration: episode.duration,
          },
          theme: 'dark',
          speedOptions: [0.75, 1, 1.25, 1.5, 1.75, 2, 2.25],
          autoplay: true,
        })
      );
    }
  }, [episode]);

  return <IonFooter id='players' />;
};
export default React.memo(Layout);
