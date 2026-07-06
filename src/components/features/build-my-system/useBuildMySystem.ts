'use client';

import { useContext, useMemo } from 'react';
import { BuildMySystemContext } from './BuildMySystemProvider';
import type { Service } from './types';

export function useBuildMySystem() {
  const ctx = useContext(BuildMySystemContext);
  if (!ctx) {
    throw new Error('useBuildMySystem must be used within a BuildMySystemProvider');
  }
  const { state, dispatch } = ctx;

  const isSelected = (serviceId: string) =>
    state.selectedServices.some((s) => s.id === serviceId);

  const addService = (service: Service) => dispatch({ type: 'ADD_SERVICE', service });
  const removeService = (serviceId: string) => dispatch({ type: 'REMOVE_SERVICE', serviceId });

  const totals = useMemo(() => {
    return state.selectedServices.reduce(
      (acc, service) => ({
        implementationMin: acc.implementationMin + service.implementationCost.min,
        implementationMax: acc.implementationMax + service.implementationCost.max,
        monthlyMin: acc.monthlyMin + service.monthlyCost.min,
        monthlyMax: acc.monthlyMax + service.monthlyCost.max,
      }),
      { implementationMin: 0, implementationMax: 0, monthlyMin: 0, monthlyMax: 0 }
    );
  }, [state.selectedServices]);

  return {
    selectedServices: state.selectedServices,
    isSelected,
    addService,
    removeService,
    totals,
  };
}
