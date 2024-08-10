import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonList,
  IonCard,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
} from '@ionic/react';
import { readReportFile } from '../helpers/fileSystem';
import './ReportPage.css';
import { displayTitle, filterCustomer, count } from '../helpers/reportHelpers';
import CustomerCard from '../components/Reports/CustomerCard';
import { filter as filterIcon, wallet, send, reader } from 'ionicons/icons';

function ReportPage({ title }: { title: string }) {
  const [totalCustomer, setTotalCustomer] = useState<Customer[]>([]);
  const [customerList, setCustomerList] = useState<{
    [ket: number]: Customer;
  }>([]);
  const [summery, setSummery] = useState<Summary>({
    visitors: 0,
    normalBaskets: 0,
    redBaskets: 0,
    // extraBaskets: 0,
    disabled: 0,
    escort: 0,
    other: 0,
    notes: 0,
  });
  const [displayedCount, setCount] = useState<{
    visitors: number;
    normalBaskets: Number;
    redBaskets: number;
    // extraBaskets: number;
  }>({
    visitors: 0,
    normalBaskets: 0,
    redBaskets: 0,
    // extraBaskets: 0,
  });
  const [filter, setFilter] = useState<Filters>('all');
  useEffect(() => {
    (async () => {
      await readReportFile(title, setTotalCustomer, setSummery);
    })();
  }, [title]);
  useEffect(() => {
    let i =
      Math.max(...Object.keys(customerList).map((numStr) => Number(numStr))) +
      1;
    if (i === -Infinity) i = 1;
    setCustomerList(filterCustomer(totalCustomer, i, filter));
  }, [totalCustomer, filter]);

  useEffect(() => {
    setCount(count(Object.values(customerList)));
  }, [customerList]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle slot="end">דו"ח {displayTitle(title)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonCard className="report-header">
          {/* <IonButton
            className='report-header-btn'
            fill='clear'
            onClick={() => {
              setFilter('extraBaskets');
            }}
          >
            <h1>{summery.extraBaskets}</h1>
            <p>נוספות</p>
          </IonButton> */}
          <IonButton
            className="report-header-btn"
            fill="clear"
            onClick={() => {
              setFilter('normalBaskets');
            }}
          >
            <h1>{summery.normalBaskets}</h1>
            <p>רגילות</p>
          </IonButton>
          <IonButton
            className="report-header-btn"
            fill="clear"
            onClick={() => {
              setFilter('redBaskets');
            }}
          >
            <h1>{summery.redBaskets}</h1>
            <p>אדומות</p>
          </IonButton>
          <IonButton
            className="report-header-btn"
            fill="clear"
            onClick={() => {
              setFilter('all');
            }}
          >
            <h1>{summery.visitors}</h1>
            <p>מטיילים</p>
          </IonButton>
        </IonCard>

        <IonCard className="report-header">
          <IonButton
            className="report-header-btn"
            fill="clear"
            onClick={() => {
              setFilter('other');
            }}
          >
            <h1>{summery.other}</h1>
            <p>אחר</p>
          </IonButton>
          <IonButton
            className="report-header-btn"
            fill="clear"
            onClick={() => {
              setFilter('disabled+');
            }}
          >
            <h1>{summery.escort}</h1>
            <p>מלווים</p>
          </IonButton>
          <IonButton
            className="report-header-btn"
            fill="clear"
            onClick={() => {
              setFilter('disabled');
            }}
          >
            <h1>{summery.disabled}</h1>
            <p>נכים</p>
          </IonButton>
        </IonCard>

        {/* Filter Btn */}
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton>
            <IonIcon icon={filterIcon} />
          </IonFabButton>
          <IonFabList side="end">
            <IonFabButton
              onClick={() => {
                setFilter('credit/cash');
              }}
            >
              <IonIcon icon={wallet} />
            </IonFabButton>
            <IonFabButton
              onClick={() => {
                setFilter('bit');
              }}
            >
              Bit
              <IonIcon icon={send} />
            </IonFabButton>
            <IonFabButton
              onClick={() => {
                setFilter('paybox');
              }}
            >
              PayBox{' '}
            </IonFabButton>
            <IonFabButton
              onClick={() => {
                setFilter('notes');
              }}
            >
              <IonIcon icon={reader} />
            </IonFabButton>
          </IonFabList>
        </IonFab>

        {/* List */}
        <p className="hebrew report-counter">
          מציג {displayedCount.visitors} מטיילים,{' '}
          {displayedCount.normalBaskets.toString()} סלסלות רגילות ו-
          {displayedCount.redBaskets} סלסלות אדומות
        </p>
        <IonList lines="inset">
          {Object.keys(customerList).map((i) => {
            const index = Number(i);
            return <CustomerCard customer={customerList[index]} key={index} />;
          })}
        </IonList>
      </IonContent>
    </>
  );
}

export default ReportPage;
