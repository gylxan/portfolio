import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Post } from 'types/post';
import { Project } from 'types/project';

interface AppState {
  posts: Post[];
  projects: Project[];
}

interface AppContextValue {
  data: AppState;
  setData: (state: AppState) => void | undefined;
}

const AppContext = createContext<AppContextValue>({
  data: { posts: [], projects: [] },
  setData: () => undefined,
});

export function AppProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<AppState>({
    posts: [],
    projects: [],
  });

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
