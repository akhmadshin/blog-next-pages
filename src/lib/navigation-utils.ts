import { KeyboardEventHandler, KeyboardEvent } from 'react';

export const onActionKeyPress = <T extends Element = Element>(callBack: (e: KeyboardEvent<T>) => void): KeyboardEventHandler<T> =>
  (e) => {
    const {key} = e;
    if (['Space', 'Enter'].includes(key)) {
      callBack(e);
    }
  };