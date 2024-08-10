import React, { useEffect, useRef } from 'react';
import {
  IonButton,
  IonModal,
  IonContent,
  IonIcon,
  IonFab,
  useIonAlert,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react';
import { saveOutline } from 'ionicons/icons';
import './SaveCard.css';
import { writeReportFile } from '../../helpers/fileSystem';
import { Keyboard } from '@capacitor/keyboard';

function SaveCard({
  customers,
  setCustomers,
  setCustomerList,
}: {
  customers: Customer[];
  setCustomers: React.Dispatch<
    React.SetStateAction<{
      [key: number]: Customer;
    }>
  >;
  setCustomerList: React.Dispatch<React.SetStateAction<Customer[]>>;
}) {
  const [presentAlert] = useIonAlert();
  const modal = useRef<HTMLIonModalElement>(null);
  const nameRef = useRef<HTMLIonInputElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <IonModal
      id="save-card"
      ref={modal}
      trigger="open-save"
      style={{
        minHeight: 300,
      }}
    >
      <IonContent>
        <h1 className="save-card-title">?לסגור קופה</h1>
        <IonItem>
          <IonLabel position="stacked">שם הקופאי</IonLabel>
          <IonInput
            ref={nameRef}
            type="text"
            placeholder="שם הקופאי"
            required
          />
        </IonItem>

        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonButton
            color="light"
            // size='small'
            strong
            fill="solid"
            onClick={() => dismiss()}
          >
            ביטול
            <IonIcon slot="end" icon={saveOutline} />
          </IonButton>
        </IonFab>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonButton
            type="submit"
            // size='small'
            strong
            fill="solid"
            onClick={() =>
              presentAlert({
                header: '?בדוק',
                subHeader: 'פעולה זו היא בלתי הפיכה',
                cssClass: 'custom-alert',
                mode: 'ios',
                buttons: [
                  {
                    text: 'ביטול',
                    role: 'cancel',
                    cssClass: 'alert-button-cancel',
                  },
                  {
                    text: 'שמור וסגור',
                    role: 'confirm',
                    cssClass: 'alert-button-confirm',
                    handler: () => {
                      const cashier =
                        typeof nameRef.current?.value === 'string'
                          ? nameRef.current.value
                          : 'לא הוגדר';
                      writeReportFile(cashier, customers);
                      setCustomers({});
                      setCustomerList([]);
                      dismiss();
                    },
                  },
                ],
              })
            }
          >
            שמור
            <IonIcon slot="end" icon={saveOutline} />
          </IonButton>
        </IonFab>
      </IonContent>
    </IonModal>
  );
}
export default SaveCard;
