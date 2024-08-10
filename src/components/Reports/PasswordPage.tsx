import React, { useRef, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonNavLink,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonFab,
  useIonAlert,
  IonIcon,
  IonNote,
} from '@ionic/react';
import ReportPage from '../../pages/ReportPage';
import { arrowForwardCircleOutline } from 'ionicons/icons';
import { displayTitle } from '../../helpers/reportHelpers';

// import PageThree from './page-three';

function PasswordPage({ title }: { title: string }) {
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const PASSWORD = '3832';
  const [presentAlert] = useIonAlert();

  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === '') return;

    value === PASSWORD ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle slot='end'>כניסה לדו"ח {displayTitle(title)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class='ion-padding'>
        <h1 className='hebrew'>דף זה דורש הרשאות מנהל</h1>
        <IonItem
          fill='solid'
          className={`${isValid && 'ion-valid'} ${
            isValid === false && 'ion-invalid'
          } ${isTouched && 'ion-touched'}`}
        >
          <IonLabel position='floating'>סיסמה</IonLabel>
          <IonInput
            type='password'
            clearInput={true}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            ref={passwordRef}
          ></IonInput>
          <IonNote slot='helper'>הכנס סיסמה</IonNote>
          <IonNote slot='error'>סיסמה לא נכונה</IonNote>
        </IonItem>
        {/* <IonItem>
          <IonLabel position='stacked'>סיסמה</IonLabel>
          <IonInput
            type='text'
            placeholder='סיסמה'
            // required
          />
          {/* {messege} */}
        {/* </IonItem> */}
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonBackButton>ביטול</IonBackButton>
        </IonFab>
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonNavLink
            routerDirection='forward'
            component={() => {
              if (passwordRef.current?.value === PASSWORD) {
                return <ReportPage title={title} />;
              } else {
                presentAlert({
                  header: 'שגיאה',
                  subHeader: 'סיסמה לא נכונה',
                  mode: 'ios',
                  buttons: ['אישור'],
                });
                return <PasswordPage title={title} />;
              }
            }}
          >
            <IonButton size='large' strong fill='solid'>
              המשך
              <IonIcon slot='end' icon={arrowForwardCircleOutline} />
            </IonButton>
          </IonNavLink>
        </IonFab>
      </IonContent>
    </>
  );
}

export default PasswordPage;
