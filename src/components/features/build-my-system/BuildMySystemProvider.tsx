'use client';

import { createContext, useReducer, type Dispatch, type ReactNode } from 'react';
import type { BuildMySystemAction, BuildMySystemState } from './types';

const initialState: BuildMySystemState = { selectedServices: [] };

function reducer(state: BuildMySystemState, action: BuildMySystemAction): BuildMySystemState {
  switch (action.type) {
    case 'ADD_SERVICE': {
      if (state.selectedServices.some((s) => s.id === action.service.id)) {
        return state;
      }
      return { selectedServices: [...state.selectedServices, action.service] };
    }
    case 'REMOVE_SERVICE': {
      return {
        selectedServices: state.selectedServices.filter((s) => s.id !== action.serviceId),
      };
    }
    default:
      return state;
  }
}

export const BuildMySystemContext = createContext<{
  state: BuildMySystemState;
  dispatch: Dispatch<BuildMySystemAction>;
} | null>(null);

// The app's one approved exception to "no global state library" (docs/architecture.md
// §"State management policy"). Mounted once in the root layout so selections persist
// across route changes. Nothing outside this folder should read BuildMySystemContext
// directly — go through useBuildMySystem() instead.
export function BuildMySystemProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BuildMySystemContext.Provider value={{ state, dispatch }}>
      {children}
    </BuildMySystemContext.Provider>
  );
}
