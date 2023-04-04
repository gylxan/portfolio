import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import type { Post } from 'types/post';
import { Project } from 'types/project';

interface ListAppState<T> {
  entries: T[];
  lastId: string | null;
}

export interface AppState {
  post: ListAppState<Post>;
  project: ListAppState<Project>;
}

interface AppContextValue {
  data: AppState;
  setData: Dispatch<SetStateAction<AppState>>;
}

export const initialState: AppState = {
  post: {
    entries: [],
    lastId: '',
  },
  project: {
    entries: [],
    lastId: '',
  },
};

const AppContext = createContext<AppContextValue>({
  data: initialState,
  setData: () => undefined,
});

export function AppProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<AppState>(initialState);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
