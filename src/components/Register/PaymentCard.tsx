import React, { useRef } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonFab,
  useIonAlert,
  IonCardSubtitle,
} from '@ionic/react';
import { calcPayment } from '../../helpers/calcPayment';

import './PaymentCard.css';

import { trashOutline } from 'ionicons/icons';
import EditCustomerForm from './editCustomerForm';

function PaymentCard({
  customer,
  index,
  removeCustomer,
  editCustomer,
}: {
  customer: Customer;
  index: number;
  removeCustomer: (i: number) => void;
  editCustomer: (i: number, customer: Customer) => void;
}) {
  const modal = useRef<HTMLIonModalElement>(null);
  const {
    name,
    numberOfPeople,
    normalBaskets,
    redBaskets,
    methodOfPayment,
    discount,
    notes,
  } = customer;

  const [presentAlert] = useIonAlert();

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <IonModal
      id="payment-card"
      ref={modal}
      trigger={`open-payment-card-${index}`}
    >
      <IonContent>
        <IonToolbar>
          <IonTitle slot="end">{name}</IonTitle>
          <IonButtons slot="start">
            <IonButton
              color="light"
              onClick={() => {
                dismiss();
              }}
            >
              סגור
            </IonButton>

            <IonButton color="light" id={`edit-customer-card-${index}`}>
              עריכה
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <EditCustomerForm customer={customer} editCustomer={editCustomer} />

        <IonCard className="hebrew">
          <IonCardHeader>
            <IonCardTitle>
              {calcPayment(numberOfPeople, normalBaskets, redBaskets, discount)}
              ₪
            </IonCardTitle>
            <IonCardSubtitle>שולמו ב{methodOfPayment}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            עבור כניסה ל-{numberOfPeople} אנשים ו-{normalBaskets} סלסלות רגילות
            ו-{redBaskets} סלסלות אדומות
          </IonCardContent>
        </IonCard>
        <IonCard className="hebrew">
          <IonCardHeader>
            <IonCardTitle>הערות</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {discount === 45 ? 'נכה + מלווה' : discount === 15 ? 'נכה' : ''}
          </IonCardContent>
          <IonCardContent>{notes}</IonCardContent>
        </IonCard>
        {/* Delete Btn */}

        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonButton
            color="danger"
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
                    text: 'מחק בכל זאת',
                    role: 'delete',
                    cssClass: 'alert-button-delete',
                    handler: () => {
                      removeCustomer(index);
                      dismiss();
                    },
                  },
                ],
              })
            }
          >
            מחק
            <IonIcon slot="end" icon={trashOutline} />
          </IonButton>
        </IonFab>
      </IonContent>
    </IonModal>
  );
}

export default PaymentCard;
