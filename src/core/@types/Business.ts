export type ReviewResult = { status: 'confirmed' | 'adjustments'; adjustments: string[] };
export type DealListItem = { name: string; id: number };

export type AdjustmentMessage = { label?: string; text: string };
export type AdjustmentRequest = {
  requestedBy: 'you' | 'other';
  messages: AdjustmentMessage[];
};
