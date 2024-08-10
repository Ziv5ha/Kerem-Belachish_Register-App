import React from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { caretForwardOutline, chevronBackOutline } from 'ionicons/icons';
import PaymentCard from './PaymentCard';
// import DetailsCard from '../DetailsCard';

function CustomerCard({
  customer,
  removeCustomer,
  editCustomer,
}: {
  customer: Customer;
  removeCustomer: (i: number) => void;
  editCustomer: (i: number, customer: Customer) => void;
}) {
  const {
    index,
    name,
    numberOfPeople,
    normalBaskets,
    redBaskets,
    // methodOfPayment,
    // discount,
    // notes,
  } = customer;

  return (
    <IonItem
      button
      detailIcon={caretForwardOutline}
      id={`open-payment-card-${index}`}
    >
      <IonLabel slot="end">
        <h2>{name}</h2>
      </IonLabel>

      <IonIcon slot="start" icon={chevronBackOutline} />
      <span style={{ fontSize: '13px' }}>
        אנשים: {numberOfPeople} | רגילות: {normalBaskets} | אדומות: {redBaskets}
      </span>
      {/* <IonLabel slot="start" className="hebrew">
        <span style={{ fontSize: '13px' }}>רגילות: {normalBaskets}</span>
      </IonLabel>
      <IonLabel slot="start" className="hebrew">
        <span style={{ fontSize: '13px' }}>אדומות: {redBaskets}</span>
      </IonLabel>
      <IonLabel slot="start">
        <span style={{ fontSize: '13px' }}>אנשים: {numberOfPeople} </span>
      </IonLabel> */}
      {/* {removeCustomer && editCustomer ? ( */}
      <PaymentCard
        customer={customer}
        index={index}
        removeCustomer={removeCustomer}
        editCustomer={editCustomer}
      />
      {/* // ) : (
      //   <DetailsCard customer={customer} index={index} />
      // )} */}
    </IonItem>
  );
}
export default CustomerCard;
