import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calculatorOutline, documentTextOutline } from 'ionicons/icons';
import Register from './pages/Register';
// import Tab3 from './pages/Tab3';

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
import ReportRoot from './pages/ReportsRoot';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        {/* Routes */}
        <IonRouterOutlet>
          <Route exact path='/Cash-Register'>
            <Register />
          </Route>
          <Route exact path='/Reports'>
            <ReportRoot />
          </Route>
          <Route exact path='/'>
            <Redirect to='/Cash-Register' />
          </Route>
        </IonRouterOutlet>

        {/* Tab Bar */}
        <IonTabBar slot='bottom'>
          <IonTabButton tab='Cash-Register' href='/Cash-Register'>
            <IonIcon icon={calculatorOutline} />
            <IonLabel>קופה</IonLabel>
          </IonTabButton>
          <IonTabButton tab='Reports' href='/Reports'>
            <IonIcon icon={documentTextOutline} />
            <IonLabel>דוחות</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
