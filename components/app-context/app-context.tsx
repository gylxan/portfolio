import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Post } from 'types/post';
import { Project } from 'types/project';

interface AppState {
  post: {
    entries: Post[];
    lastId: string | null;
  };
  project: {
    entries: Project[];
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
