// card.model.ts
export interface Card {
    id: number; 
    name: string;
    code: string;
    ccv: string;
    expiryMonth: number;
    expiryYear: number;
  }