import React, { useState } from 'react';
import { MdCheckBox } from 'react-icons/md';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

import { useWatchList } from '../../Provider/Watchlists/Watchlist';
import { useAddToListContext } from '../../Provider/Modals/AddToList';
import { useCreateListContext } from '../../Provider/Modals/CreateList';
import BasicModal from './BasicModal';
import Btn from '../Btn/Btn';

import './index.css';

const AddToList = (props: any) => {
  const { lists, addTickerToMultiple } = useWatchList();
  const { setOpen, ticker, name } = useAddToListContext();

  const { setOpen: setCreateListOpen } = useCreateListContext();

  const theme: any = useTheme();

  const [selected, setSelected] = useState<any[]>([]);

  const handleItemSelect = (index: number) => {
    const arr = [...selected];

    const position = arr.indexOf(index);

    if (position >= 0) {
      arr.splice(position, 1);
    } else {
      arr.push(index);
    }

    setSelected(arr);
  };

  const onSave = () => {
    addTickerToMultiple(ticker, name, selected);
    setOpen(false);
  };

  let items = lists.map((el: any, index: number) => {
    if (
      el.tickers.some((ele: any) => ele.ticker === ticker) &&
      !selected.some((element) => element === index)
    ) {
      setSelected([...selected, index]);
    }

    const active = selected.indexOf(index) >= 0;

    const className = active ? 'checked' : '';

    return (
      <li
        className={
          'modal__item ' +
          className +
          ' ' +
          css`
            background: ${theme.modalItemBackground};
            &:hover {
              background: ${theme.modalItemHover};
            }
          `
        }
        onClick={() => handleItemSelect(index)}
      >
        <div className='flex-row'>
          <div
            className={
              'modal__item-circle ' +
              css`
                background: ${active ? '#fff' : theme.btnBackground};
                color: ${active ? '#000' : theme.btnText};
              `
            }
          >
            {el.title[0]}
          </div>
          {el.title}
        </div>
        {active ? <MdCheckBox className='modal__checkbox' /> : null}
      </li>
    );
  });

  return (
    <BasicModal isOpen={props.isOpen} setOpen={setOpen}>
      <h2 className='modal__header'>Save this stock</h2>

      <ul className='modal__list'>{items}</ul>
      <div className='flex-between-row'>
        <Btn className='modal__done-btn' onClick={onSave}>
          Done
        </Btn>
        <Btn
          className='modal__new-btn'
          onClick={() => setCreateListOpen(true)}
          outline
        >
          Create a new watchlist
        </Btn>
      </div>
    </BasicModal>
  );
};

export default AddToList;
