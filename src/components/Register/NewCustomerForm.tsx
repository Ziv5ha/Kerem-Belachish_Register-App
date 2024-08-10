import React, { useRef, useState } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonIcon,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  useIonAlert,
  IonCard,
  IonCardTitle,
  IonCardHeader,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import {
  addCircleOutline,
  removeCircleOutline,
  saveOutline,
} from 'ionicons/icons';
import { calcPayment } from '../../helpers/calcPayment';
import './CustomerForm.css';

function NewCustomerForm({
  addCustomer,
}: {
  addCustomer: (customer: Customer) => void;
}) {
  const modal = useRef<HTMLIonModalElement>(null);
  const nameRef = useRef<HTMLIonInputElement>(null);
  const numberOfPeopleRef = useRef<HTMLIonInputElement>(null);
  // const numberOfBasketRef = useRef<HTMLIonInputElement>(null);
  const selectPaymentRef = useRef<HTMLIonSelectElement>(null);
  const discountRef = useRef<HTMLIonSelectElement>(null);
  const notesRef = useRef<HTMLIonInputElement>(null);

  const [numberOfPeople, setnumberOfPeople] = useState(0);
  const [normalBaskets, setNormalBaskets] = useState(0);
  const [redBaskets, setRedBaskets] = useState(0);

  const [presentAlert] = useIonAlert();

  // function confirm(e: React.FormEvent<HTMLFormElement>) {
  function confirm(e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) {
    e.preventDefault();
    const name = nameRef.current?.value;
    const numberOfPeople = Number(numberOfPeopleRef.current?.value);
    // const numberOfBaskets = Number(numberOfBasketRef.current?.value);
    const methodOfPayment = selectPaymentRef.current?.value || 'אשראי/מזומן';
    const discount = discountRef.current?.value || '';
    const notes = notesRef.current?.value;

    if (
      typeof name === 'string' &&
      isNaN(numberOfPeople) === false &&
      isNaN(normalBaskets) === false &&
      (methodOfPayment === 'אשראי/מזומן' ||
        methodOfPayment === 'ביט' ||
        methodOfPayment === 'פייבוקס')
    ) {
      const customer = {
        name,
        numberOfPeople,
        normalBaskets,
        redBaskets,
        methodOfPayment,
        discount,
        notes,
      } as Customer;

      presentAlert({
        header: `שלום ${name}`,
        subHeader: `:סכום לתשלום ${calcPayment(
          numberOfPeople,
          normalBaskets,
          redBaskets,
          discount
        )}₪`,
        message: `עבור כניסה ל-${numberOfPeople} אנשים ו-${normalBaskets} סלסלות רגילות ו-${redBaskets} סלסלות אדומות`,
        buttons: ['אישור'],
      });
      modal.current?.dismiss(customer, 'confirm');
    }
  }

  function ionModalWillPresent() {
    setnumberOfPeople(0);
    setNormalBaskets(0);
    setRedBaskets(0);
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      addCustomer(ev.detail.data);
    }
  }

  return (
    <IonModal
      ref={modal}
      trigger="open-new-customer-form"
      onWillDismiss={onWillDismiss}
      onWillPresent={ionModalWillPresent}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              ביטול
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={confirm}>
              <IonIcon icon={saveOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle slot="end">
            סכום לתשלום:{' '}
            {calcPayment(
              Number(numberOfPeopleRef.current?.value),
              normalBaskets,
              redBaskets,
              discountRef.current?.value || ''
            ) || 0}
            ₪
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* <form onSubmit={confirm}> */}
        <form>
          <IonItem>
            <IonLabel position="stacked">מספר מבקרים</IonLabel>
            <IonInput
              ref={numberOfPeopleRef}
              type="number"
              placeholder="מספר מבקרים"
              required
              onIonInput={(e) =>
                setnumberOfPeople(
                  isNaN(Number(numberOfPeopleRef.current?.value))
                    ? 0
                    : Number(numberOfPeopleRef.current?.value)
                )
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">מספר סלסלות</IonLabel>
            <div className="basket-counters-container">
              <div className="basket-counter">
                <h3>רגילות</h3>

                <div className="basket-counter-btns-container">
                  <button
                    type="button"
                    className="basket-counter-btn"
                    onClick={() =>
                      setNormalBaskets((prev) => (prev === 0 ? 0 : --prev))
                    }
                  >
                    <IonIcon icon={removeCircleOutline} />
                  </button>
                  {normalBaskets}
                  <button
                    type="button"
                    className="basket-counter-btn"
                    onClick={() => setNormalBaskets((prev) => ++prev)}
                  >
                    <IonIcon icon={addCircleOutline} />
                  </button>
                </div>
              </div>
              <div className="basket-counter">
                <h3>אדומות</h3>
                <div className="basket-counter-btns-container">
                  <button
                    type="button"
                    className="basket-counter-btn"
                    onClick={() =>
                      setRedBaskets((prev) => (prev === 0 ? 0 : --prev))
                    }
                  >
                    <IonIcon icon={removeCircleOutline} />
                  </button>
                  {redBaskets}
                  <button
                    type="button"
                    className="basket-counter-btn"
                    onClick={() => setRedBaskets((prev) => ++prev)}
                  >
                    <IonIcon icon={addCircleOutline} />
                  </button>
                </div>
              </div>
            </div>
            {/* <IonInput
              ref={numberOfBasketRef}
              type="number"
              placeholder="מספר סלסלות"
              required
            /> */}
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">שם הלקוח</IonLabel>
            <IonInput
              ref={nameRef}
              type="text"
              placeholder="שם הלקוח"
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">אמצעי תשלום</IonLabel>
            <IonSelect
              placeholder="אשראי/מזומן"
              ok-text="אישור"
              cancel-text="ביטול"
              defaultValue="אשראי/מזומן"
              ref={selectPaymentRef}
              onIonCancel={() => {
                if (selectPaymentRef.current?.value)
                  selectPaymentRef.current.value = 'אשראי/מזומן';
              }}
            >
              <IonSelectOption value="אשראי/מזומן">אשראי/מזומן</IonSelectOption>
              <IonSelectOption value="ביט">ביט</IonSelectOption>
              <IonSelectOption value="פייבוקס">פייבוקס</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">הנחה</IonLabel>
            <IonSelect
              placeholder="הנחה"
              ok-text="אישור"
              cancel-text="ביטול"
              ref={discountRef}
              onIonCancel={() => {
                if (discountRef.current?.value)
                  discountRef.current.value = undefined;
              }}
            >
              <IonSelectOption value="group">קבוצה</IonSelectOption>
              <IonSelectOption value={15}>נכה</IonSelectOption>
              <IonSelectOption value={45}>נכה + מלווה</IonSelectOption>
              {/* <IonSelectOption value='free'>מדריך</IonSelectOption> */}
              <IonSelectOption value="other">אחר</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">הערות</IonLabel>
            <IonInput
              ref={notesRef}
              type="text"
              placeholder={
                selectPaymentRef.current?.value === 'אשראי/מזומן'
                  ? 'הכנס מספר טלפון ליצירת שקר במקרה תקלה'
                  : 'הערות'
              }
            />
          </IonItem>
          <IonButton onClick={confirm} expand="block">
            <IonIcon icon={saveOutline} />
          </IonButton>
        </form>
      </IonContent>
    </IonModal>
  );
}

export default NewCustomerForm;
