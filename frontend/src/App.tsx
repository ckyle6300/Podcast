import {
  IonApp,
  IonContent,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Search from './pages/Search';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import PodcastInfo from './pages/PodcastInfo';
import React from 'react';
import Layout from './pages/Layout';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonContent></IonContent>
      <Layout />
      <IonReactRouter>
        <IonSplitPane contentId='main'>
          <Menu />
          <IonRouterOutlet id='main'>
            <Redirect path='/' exact to='search' />
            <Route path='/podcasts/:podcastId' component={PodcastInfo} exact />
            <Route path='/search' component={Search} exact />
            <Route path='/page/:name' exact={true} component={Page} />
            <Route>
              <h1>404</h1>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
