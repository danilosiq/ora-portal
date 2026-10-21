import { businessStages } from '@/core/mocks/BusinessData';

type BusinessProgressProps = { businessId: number };

export function getBusinessProgress({ businessId }: BusinessProgressProps) {
  const index = businessId === 1 || businessId === 7 ? businessStages.length - 1 : 0;
  return { ...businessStages[index], index, completed: index === businessStages.length - 1 };
}
