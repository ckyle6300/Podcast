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
      <IonReactRouter>
        <IonContent></IonContent>
        <Layout />
        <IonSplitPane contentId='main'>
          <Menu />
          <IonRouterOutlet id='main'>
            <Switch>
              <Route path='/' exact={true}>
                <Redirect to='/page/Inbox' />
              </Route>
              <Route path='/podcasts/search' exact>
                <Search />
              </Route>
              <Route path='/podcasts/:podcastId' exact>
                <PodcastInfo />
              </Route>
              <Route path='/page/:name' exact={true}>
                <Page />
              </Route>
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
