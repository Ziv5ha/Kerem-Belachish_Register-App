export const isCustomer = (customer: any): customer is Customer => {
  return (
    typeof customer.name === 'string' &&
    isNaN(customer.numberOfPeople) === false &&
    isNaN(customer.normalBaskets) === false &&
    isNaN(customer.redBaskets) === false &&
    (customer.methodOfPayment === 'אשראי/מזומן' ||
      customer.methodOfPayment === 'ביט' ||
      customer.methodOfPayment === 'פייבוקס')
  );
};

export const isCustomerArr = (customers: any[]): customers is Customer[] => {
  return customers.every((customer) => isCustomer(customer));
};
