import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonSearchbar,
} from '@ionic/react';
import NewCustomerForm from '../components/Register/NewCustomerForm';
import { add, saveOutline } from 'ionicons/icons';

import './Register.css';
import { useEffect, useState } from 'react';
import CustomerCard from '../components/Register/CustomerCard';
import {
  IonSearchbarCustomEvent,
  SearchbarChangeEventDetail,
} from '@ionic/core';
import SaveCard from '../components/Register/SaveCard';
import { Filesystem } from '@capacitor/filesystem';
import { isCustomer, isCustomerArr } from '../helpers/general';

const Register: React.FC = () => {
  const [customers, setCustomers] = useState<{
    [key: number]: Customer;
  }>({});
  const [customerList, setCustomerList] = useState<Customer[]>([]);

  useEffect(() => {
    (async () => {
      if ((await Filesystem.checkPermissions()).publicStorage !== 'granted')
        Filesystem.requestPermissions();
    })();
  }, []);

  const addCustomer = (customer: Customer) => {
    setCustomers((prev) => {
      const prevCopy = structuredClone(prev);
      let i =
        Math.max(...Object.keys(prevCopy).map((numStr) => Number(numStr))) + 1;
      if (i === -Infinity) i = 1;
      customer.index = i;
      prevCopy[i] = customer;
      const customersList = Object.values(prevCopy);
      if (isCustomerArr(customersList))
        setCustomerList(customersList.reverse());
      return prevCopy;
    });
  };
  const removeCustomer = (i: number): void => {
    setCustomers((prev) => {
      const prevCopy = structuredClone(prev);
      delete prevCopy[i];
      const customersList = Object.values(prevCopy);
      if (isCustomerArr(customersList))
        setCustomerList(customersList.reverse());
      return prevCopy;
    });
  };
  const editCustomer = (i: number, customer: Customer): void => {
    setCustomers((prev) => {
      const prevCopy = structuredClone(prev);
      customer.index = i;
      prevCopy[i] = customer;
      const customersList = Object.values(prevCopy);
      if (isCustomerArr(customersList))
        setCustomerList(customersList.reverse());
      return prevCopy;
    });
  };

  const handleSearch = (
    e: IonSearchbarCustomEvent<SearchbarChangeEventDetail>
  ) => {
    const query = e.target.value?.toLocaleLowerCase() || '';
    setCustomerList(
      Object.values(customers).filter(({ name }) =>
        name.toLocaleLowerCase().includes(query)
      )
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot='end'>קופה</IonTitle>

          <SaveCard
            customers={Object.values(customers)}
            setCustomers={setCustomers}
            setCustomerList={setCustomerList}
          />
        </IonToolbar>
      </IonHeader>
      <IonFab vertical='bottom' horizontal='start' slot='fixed' id='open-save'>
        <IonFabButton>
          <IonIcon icon={saveOutline} />
        </IonFabButton>
      </IonFab>
      <IonContent fullscreen>
        <NewCustomerForm addCustomer={addCustomer} />

        <IonSearchbar
          placeholder='חיפוש'
          debounce={1000}
          onIonChange={handleSearch}
        ></IonSearchbar>
        <IonList>
          {customerList
            // .slice()
            // .reverse()
            .map((customer, i) => (
              <CustomerCard
                key={customer.name + i}
                customer={customer}
                removeCustomer={removeCustomer}
                editCustomer={editCustomer}
              />
            ))}
        </IonList>
        <IonFab
          vertical='bottom'
          horizontal='end'
          slot='fixed'
          id='open-new-customer-form'
        >
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Register;
