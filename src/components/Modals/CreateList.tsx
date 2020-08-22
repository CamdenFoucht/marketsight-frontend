import React, { useState } from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

import { useCreateListContext } from '../../Provider/Modals/CreateList';
import { useWatchList } from '../../Provider/Watchlists/Watchlist';
import BasicModal from './BasicModal';
import Btn from '../Btn/Btn';

import './index.css';

const CreateList = (props: any) => {
  const theme: any = useTheme();
  const { setOpen } = useCreateListContext();
  const { addList } = useWatchList();

  const [text, setText] = useState('');

  const doneHandler = () => {
    addList(text);
    closeHandler();
  };

  const closeHandler = () => {
    setText('');
    setOpen(false);
  };

  return (
    <BasicModal isOpen={props.isOpen} setOpen={setOpen}>
      <h2 className='modal__header'>Create a new watchlist</h2>

      <div>
        <label className='modal__input-label'>Name</label>
        <input
          placeholder='Tab Name'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={
            'modal__input ' +
            css`
              background: ${theme.modalInputBackground};
              color: ${theme.text};
              &:focus {
                outline: none;
                border: 1px solid transparent;
              }
            `
          }
        />
      </div>
      <div className='flex-row'>
        <Btn className='modal__done-btn' onClick={() => doneHandler()}>
          Done
        </Btn>
        <Btn className='modal__new-btn' onClick={() => setOpen(false)} outline>
          Cancel
        </Btn>
      </div>
    </BasicModal>
  );
};

export default CreateList;
