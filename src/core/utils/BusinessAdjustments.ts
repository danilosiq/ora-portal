import type { AdjustmentRequest, ReviewResult } from '@/core/@types/Business';
import { adjustmentRequests, adjustmentSections } from '@/core/mocks/BusinessData';

type BusinessAdjustmentsProps = { businessId: number; review?: ReviewResult };

export function getBusinessAdjustment({
  businessId,
  review,
}: BusinessAdjustmentsProps): AdjustmentRequest | undefined {
  if (review?.status === 'confirmed') return undefined;
  if (review?.status === 'adjustments') {
    return {
      requestedBy: 'you',
      messages: review.adjustments
        .map((text, index) => ({ label: adjustmentSections[index], text }))
        .filter(({ text }) => text.trim()),
    };
  }
  return adjustmentRequests[businessId];
}
