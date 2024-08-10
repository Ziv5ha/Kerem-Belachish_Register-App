export const filterCustomer = (
  customers: Customer[],
  startingIndex: number = 1,
  filter: Filters = 'all'
): { [key: number]: Customer } => {
  const customersObj = {} as { [key: number]: Customer };
  switch (filter) {
    case 'normalBaskets':
      customers
        .filter(({ normalBaskets }) => normalBaskets > 0)
        .forEach((customer, i) => (customersObj[i + startingIndex] = customer));
      break;
    case 'redBaskets':
      customers
        .filter(({ redBaskets }) => redBaskets > 0)
        .forEach((customer, i) => (customersObj[i + startingIndex] = customer));
      break;
    case 'disabled':
      customers
        .filter(({ discount }) => discount === 15)
        .forEach((customer, i) => (customersObj[i + startingIndex] = customer));
      break;
    case 'disabled+':
      customers
        .filter(({ discount }) => discount === 45)
        .forEach((customer, i) => (customersObj[i + startingIndex] = customer));
      break;
    case 'other':
      customers
        .filter(({ discount }) => discount === 'other')
        .forEach((customer, i) => (customersObj[i + startingIndex] = customer));
      break;
    case 'notes':
      customers
        .filter(({ notes }) => notes)
        .forEach((customer, i) => (customersObj[i + startingIndex] = customer));
      break;
    case 'credit/cash':
      customers
        .filter(({ methodOfPayment }) => methodOfPayment === 'אשראי/מזומן')
        .forEach((customer, i) => (customersObj[i + startingIndex] = customer));
      break;
    case 'bit':
      customers
        .filter(({ methodOfPayment }) => methodOfPayment === 'ביט')
        .forEach((customer, i) => (customersObj[i + startingIndex] = customer));
      break;
    case 'paybox':
      customers
        .filter(({ methodOfPayment }) => methodOfPayment === 'פייבוקס')
        .forEach((customer, i) => (customersObj[i + startingIndex] = customer));
      break;
    // case 'extraBaskets':
    //   customers
    //     .filter(
    //       ({ normalBaskets, redBaskets, numberOfPeople }) =>
    //         normalBaskets + redBaskets > numberOfPeople
    //     )
    //     .forEach((customer, i) => (customersObj[i + startingIndex] = customer));
    //   break;
    default:
      customers.forEach(
        (customer, i) => (customersObj[i + startingIndex] = customer)
      );
      break;
  }
  return customersObj;
};

export const calcSummary = (customers: Customer[]): Summary => {
  let visitors = 0;
  let toalNormalBaskets = 0;
  let totalRedBaskets = 0;
  // let extraBaskets = 0;
  let disabled = 0;
  let escort = 0;
  let other = 0;
  let notes = 0;
  customers.forEach(
    ({ numberOfPeople, normalBaskets, redBaskets, discount }) => {
      visitors += numberOfPeople;
      // if (normalBaskets + redBaskets <= numberOfPeople) {
      toalNormalBaskets += normalBaskets;
      totalRedBaskets += redBaskets;
      // } else {
      //   toalNormalBaskets += normalBaskets;
      //   totalRedBaskets += redBaskets;
      //   extraBaskets += normalBaskets + redBaskets - numberOfPeople;
      // }
      if (discount === 15) disabled += 1;
      if (discount === 45) {
        disabled += 1;
        escort += 1;
      }
      if (discount === 'other') other += numberOfPeople;
    }
  );
  return {
    visitors,
    normalBaskets: toalNormalBaskets,
    redBaskets: totalRedBaskets,
    disabled,
    escort,
    other,
    notes,
  };
};

export const displayTitle = (title: string): string => {
  const date = title.split('|')[2];
  const cashier = title.split('|')[0];
  return `${date} | ${cashier}`.replaceAll('_', '');
};

export const count = (
  customers: Customer[]
): { visitors: number; normalBaskets: number; redBaskets: number } => {
  let visitors = 0;
  let toalNormalBaskets = 0;
  let totalRedBaskets = 0;
  // let extraBaskets = 0;
  customers.forEach(({ numberOfPeople, normalBaskets, redBaskets }) => {
    visitors += numberOfPeople;
    // if (normalBaskets + redBaskets <= numberOfPeople) {
    toalNormalBaskets += normalBaskets;
    totalRedBaskets += redBaskets;
    // } else {
    // toalNormalBaskets += normalBaskets;
    // totalRedBaskets += redBaskets;
    // extraBaskets += normalBaskets + redBaskets - numberOfPeople;
    // }
  });
  return {
    visitors,
    normalBaskets: toalNormalBaskets,
    redBaskets: totalRedBaskets,
  };
};
