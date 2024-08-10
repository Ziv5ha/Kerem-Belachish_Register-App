/// <reference types="react-scripts" />

declare interface Customer {
  index: number;
  name: string;
  numberOfPeople: number;
  normalBaskets: number;
  redBaskets: number;
  methodOfPayment: null | 'אשראי/מזומן' | 'ביט' | 'פייבוקס';
  discount: null | number | 'other';
  notes: string;
}

declare interface Summary {
  visitors: number;
  normalBaskets: number;
  redBaskets: number;
  // extraBaskets: number;
  disabled: number;
  escort: number;
  other: number;
  notes: number;
}

declare type Filters =
  | 'all'
  | 'normalBaskets'
  | 'redBaskets'
  | 'disabled'
  | 'disabled+'
  | 'other'
  | 'credit/cash'
  | 'bit'
  | 'paybox'
  | 'notes';
// | 'extraBaskets';
