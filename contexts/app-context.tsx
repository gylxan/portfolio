import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import type { Post } from 'types/post';

interface AppState {
  post: {
    entries: Post[];
    lastId: string | null;
  };
}

interface AppContextValue {
  data: AppState;
  setData: Dispatch<SetStateAction<AppState>>;
}

const initialState: AppState = {
  post: {
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
