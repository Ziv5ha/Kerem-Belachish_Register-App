import { json2csv, csv2json } from 'json-2-csv';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import moment from 'moment';
import { calcSummary } from './reportHelpers';

export const writeReportFile = (cashier: string, data: Customer[]) => {
  json2csv(data, async (err, csv) => {
    if (csv) {
      const now = moment().format('HH:mm:ss_|_DD-MM-YYYY');
      await Filesystem.writeFile({
        path: `Kerem-Belachish/reports/${cashier}_|_${now}.csv`,
        data: csv,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
        recursive: true,
      });
    } else {
      console.error(err);
    }
  });
};

export const readReportFile = async (
  fileName: string,
  setCustomerList: React.Dispatch<React.SetStateAction<Customer[]>>,
  setSummery: React.Dispatch<React.SetStateAction<Summary>>
) => {
  const { data } = await Filesystem.readFile({
    path: `Kerem-Belachish/reports/${fileName}.csv`,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
  csv2json(data, async (err, json) => {
    if (err) {
      console.error(err);
    } else {
      if (json?.every((item) => isCustomer(item))) {
        setCustomerList(json);
        setSummery(calcSummary(json));
      }
      return json;
    }
  });
};

export const readReportsDir = async () => {
  const contents = await Filesystem.readdir({
    path: `Kerem-Belachish/reports`,
    directory: Directory.Documents,
  });

  return contents;
};

const isCustomer = (item: any): item is Customer => {
  return (
    (typeof item.name === 'string' || typeof item.name === 'number') &&
    isNaN(item.numberOfPeople) === false &&
    isNaN(item.normalBaskets) === false &&
    isNaN(item.redBaskets) === false &&
    (item.methodOfPayment === 'אשראי/מזומן' ||
      item.methodOfPayment === 'ביט' ||
      item.methodOfPayment === 'פייבוקס')
  );
};
