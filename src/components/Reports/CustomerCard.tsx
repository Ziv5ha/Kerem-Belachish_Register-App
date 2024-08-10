import React from 'react';
import { IonIcon, IonItem, IonLabel, useIonAlert } from '@ionic/react';
import { caretForwardOutline, chevronBackOutline } from 'ionicons/icons';
import { calcPayment } from '../../helpers/calcPayment';
// import PaymentCard from './PaymentCard';

function CustomerCard({ customer }: { customer: Customer }) {
  const [presentAlert] = useIonAlert();

  const {
    // index,
    name,
    numberOfPeople,
    normalBaskets,
    redBaskets,
    methodOfPayment,
    discount,
    notes,
  } = customer;

  return (
    <IonItem
      button
      detailIcon={caretForwardOutline}
      onClick={() =>
        presentAlert({
          cssClass: 'hebrew',
          header: `${name} שילם ${calcPayment(
            numberOfPeople,
            normalBaskets,
            redBaskets,
            discount
          )}₪ ב${methodOfPayment}`,
          subHeader: `עבור כניסה ל-${numberOfPeople} אנשים ו-${normalBaskets} סלסלות רגילות ו-${redBaskets} סלסלות אדומות`,
          message: `
            ${
              discount === 45
                ? 'נכה + מלווה | '
                : discount === 15
                ? 'נכה | '
                : ''
            }${notes}`,
          buttons: ['אישור'],
        })
      }
    >
      <IonLabel slot="end">
        <h2>{name}</h2>
      </IonLabel>

      <IonIcon slot="start" icon={chevronBackOutline} />
      <span style={{ fontSize: '13px' }}>
        אנשים: {numberOfPeople} | רגילות: {normalBaskets} | אדומות: {redBaskets}
      </span>
      {/* <IonLabel slot="start" className="hebrew">
        <span>סלסלות רגילות: {normalBaskets}</span>
      </IonLabel>
      <IonLabel slot="start" className="hebrew">
        <span>סלסלות אדומות: {redBaskets}</span>
      </IonLabel>
      <IonLabel slot="start">
        <span>מטיילים: {numberOfPeople} </span>
      </IonLabel> */}
    </IonItem>
  );
}
export default CustomerCard;
