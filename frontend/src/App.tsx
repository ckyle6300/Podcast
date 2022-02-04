import React from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import MyPodcasts from './pages/MyPodcasts';
import Menu from './components/Menu';

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

const PodcastInfo = React.lazy(() => import('./pages/PodcastInfo'));
const Layout = React.lazy(() => import('./pages/Layout'));
const NotFound = React.lazy(() => import('./pages/404'));
const RecentEpisodes = React.lazy(() => import('./pages/RecentEpisodes'));
const Page = React.lazy(() => import('./pages/Page'));
const Search = React.lazy(() => import('./pages/Search'));
setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <React.Suspense fallback={<h2>Waiting...</h2>}>
        <Layout>
          <IonReactRouter>
            <IonSplitPane contentId='main'>
              <Menu />
              <IonRouterOutlet id='main'>
                <Redirect path='/' exact to='/mypodcasts' />
                <Route
                  path='/podcasts/:podcastId'
                  component={PodcastInfo}
                  exact
                />
                <Route path='/search' component={Search} exact />
                <Route path='/page/:name' exact={true} component={Page} />
                <Route path='/mypodcasts' exact component={MyPodcasts} />
                <Route
                  path='/mypodcasts/episodes'
                  exact
                  component={RecentEpisodes}
                />
                <Route>
                  <NotFound />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </Layout>
      </React.Suspense>
    </IonApp>
  );
};

export default App;
