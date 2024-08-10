import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNavLink,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PasswordPage from '../components/Reports/PasswordPage';
import { readReportsDir } from '../helpers/fileSystem';
import './Reports.css';

const Reports: React.FC = () => {
  let location = useLocation();
  const [reports, setReports] = useState<string[]>([]);

  useEffect(() => {
    if (location.pathname === '/Reports') {
      loadFiles();
    }
  }, [location]);

  const loadFiles = async () => {
    const { files } = await readReportsDir();
    setReports(files.map((file) => file.name.slice(0, -4)));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot='end'>דוחות</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines='inset'>
          {reports.map((report) => (
            <IonNavLink
              key={report}
              routerDirection='forward'
              component={() => <PasswordPage title={report} />}
            >
              <IonItem button detail={true}>
                <IonLabel>{report.replaceAll('_', ' ')}</IonLabel>
              </IonItem>
            </IonNavLink>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Reports;
