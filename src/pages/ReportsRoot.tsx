import React from 'react';
import { IonNav } from '@ionic/react';

import Reports from './Reports';

function ReportRoot() {
  return <IonNav root={() => <Reports />}></IonNav>;
}
export default ReportRoot;
