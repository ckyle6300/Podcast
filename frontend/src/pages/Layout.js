import React, { useMemo } from 'react';
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import 'shikwasa/dist/shikwasa.min.css';
import Shikwasa from 'shikwasa';
import Chapter from 'shikwasa/dist/shikwasa.chapter.cjs';
import 'shikwasa/dist/shikwasa.chapter.css';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

const Layout = (props) => {
  const podInfo = useSelector((state) => state.podcastInfo);
  const { episode, chp, podcast, count } = podInfo;
  const [anotherEpisode, setAnotherEpisode] = useState(false);
  const playerRef = useRef();

  useEffect(() => {
    console.log('hello');
    Shikwasa.use(Chapter);
    let player = new Shikwasa({
      container: document.getElementById('players'),
      audio: {
        src: '',
        cover: '',
        title: '',
        artist: '',
        duration: '',
        chapters: '',
      },
      theme: 'dark',
      speedOptions: [0.75, 1, 1.25, 1.5, 1.75, 2, 2.25],
      autoplay: true,
    });
  }, []);

  // function update(player) {
  //   const TAudio = {
  //     src: episode.enclosureUrl,
  //     cover: episode.image,
  //     title: episode.title,
  //     artist: podcast.title,
  //     duration: episode.duration,
  //     chapters: chp,
  //   };
  //   playerRef.current.update(TAudio);
  // }

  console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');

  // console.log(chp, '777777777777777777');
  // useEffect(() => {
  //   if (count == 10) {
  //     const TAudio = {
  //       src: episode.enclosureUrl,
  //       cover: episode.image,
  //       title: episode.title,
  //       artist: podcast.title,
  //       duration: episode.duration,
  //       chapters: chp,
  //     };
  //     playerRef.current.update(TAudio);
  //   }
  // }, [episode, chp, podcast, count]);

  // console.log(count, 'hello');

  return <IonFooter id='players' />;
};
export default React.memo(Layout);
