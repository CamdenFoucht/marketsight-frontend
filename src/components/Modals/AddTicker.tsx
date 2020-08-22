import React, { useState } from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

import { useWatchList } from '../../Provider/Watchlists/Watchlist';
import { useAddTickerContext } from '../../Provider/Modals/AddTicker';
import Search from './Search';

import BasicModal from './BasicModal';
import Btn from '../Btn/Btn';

import './index.css';

const AddTicker = (props: any) => {
  const theme: any = useTheme();
  const [chosenCompany, setChosenCompany] = useState<any>({});

  const { addCompany } = useWatchList();
  const { setOpen } = useAddTickerContext();

  const handleSearch = (ticker: string, company: string) => {
    setChosenCompany({ ticker, company });
  };

  const saveHandler = () => {
    if (chosenCompany.ticker) {
      addCompany(chosenCompany.ticker, chosenCompany.company);
    }
    setChosenCompany({});
    setOpen(false);
  };

  return (
    <BasicModal isOpen={props.isOpen} setOpen={setOpen} height={'600px'}>
      <div className='flex-between-column height-100'>
        <div>
          <h2 className='modal__header'>Add a company</h2>

          <Search handleSearch={handleSearch} />
        </div>
        <div>
          {chosenCompany.hasOwnProperty('ticker') ? (
            <>
              <p className='modal__selected-p'>Selected stock:</p>
              <div
                className={
                  'modal__selected-ticker ' +
                  css`
                    background: ${theme.selectedStockBackground};
                  `
                }
              >
                <div className='flex-row'>
                  <span
                    className='modal__chosen-ticker modal__item-circle'
                    style={{
                      background: theme.btnBackground,
                      color: theme.btnText,
                    }}
                  >
                    {chosenCompany.ticker}
                  </span>
                  <span className='modal__chosen-company'>
                    {chosenCompany.company}
                  </span>
                </div>
              </div>
            </>
          ) : null}
          <div className='flex-row'>
            <Btn
              disabled={!chosenCompany.hasOwnProperty('ticker')}
              className='modal__done-btn'
              onClick={saveHandler}
            >
              Save
            </Btn>
            <Btn
              className='modal__cancel-btn'
              onClick={() => setOpen(false)}
              outline
            >
              Cancel
            </Btn>
          </div>
        </div>
      </div>
    </BasicModal>
  );
};

export default AddTicker;
