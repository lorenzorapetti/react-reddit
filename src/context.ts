import { createContext } from 'react';

export interface ITitleContext {
  title: string;
  setTitle?: (title: string) => void;
}

export const TitleContext = createContext<ITitleContext>({
  title: 'React Reddit',
});
