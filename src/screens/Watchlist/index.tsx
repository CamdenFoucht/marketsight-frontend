import React, { useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';

import { useWatchList } from '../../Provider/Watchlists';
import { useAddToListContext } from '../../Provider/Modals/AddToList';
import { useCreateListContext } from '../../Provider/Modals/CreateList';
import Nav from '../../components/Watchlist/Nav';
import WatchlistChart from '../../components/Charts/WatchlistChart';
import AddChart from '../../components/Charts/AddChart';
import EmptyWatchlist from '../../components/Watchlist/EmptyWatchlist';
import WatchlistRowChart from '../../components/Charts/WatchlistRowChart';
import Loading from '../../components/Watchlist/Loading';
import DangerBtn from '../../components/Btn/DangerBtn';

import './index.css';

const Watchlist = () => {
  const {
    lists,
    setActiveList,
    activeList,
    removeCompany,
    deleteList,
    loading,
  } = useWatchList();

  const { openAddToListModal } = useAddToListContext();
  const { setOpen: openCreateListModal } = useCreateListContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const tabHandler = (index: number) => {
    setActiveList(index);
  };

  const [isGrid, setIsGrid] = useState(true);

  let items = null;

  if (lists[activeList]) {
    items = lists[activeList].tickers.map((el: any, index: number) =>
      isGrid ? (
        <Col xs={12} sm={6} md={3} style={{ marginBottom: '2rem' }}>
          <WatchlistChart
            editMode={editMode}
            saveToLists={() => openAddToListModal(el.ticker, el.name)}
            deleteTicker={() => removeCompany(activeList, el.ticker)}
            key={el.ticker}
            ticker={el.ticker}
            name={el.name}
          />
        </Col>
      ) : (
        <WatchlistRowChart
          editMode={editMode}
          saveToLists={() => openAddToListModal(el.ticker, el.name)}
          deleteTicker={() => removeCompany(activeList, el.ticker)}
          key={el.ticker}
          ticker={el.ticker}
          name={el.name}
        />
      )
    );
  }

  const deleteHandler = () => {
    deleteList(activeList);
  };

  let content = null;

  if (loading) {
    content = <Loading />;
  } else if (lists.length === 0) {
    content = <EmptyWatchlist onClick={() => openCreateListModal(true)} />;
  } else if (isGrid) {
    content = (
      <Row>
        {items}
        <Col xs={12} sm={6} md={3} style={{ marginBottom: '2rem' }}>
          <AddChart />
        </Col>
      </Row>
    );
  } else {
    content = <div>{items}</div>;
  }

  const deleteListByIndexHandler = (index: number) => {
    const res = prompt(
      'If you wish to delete this list. Please confirm by typing the name of the list'
    );
    if (res && res?.toLowerCase() === lists[index].title.toLowerCase()) {
      if (lists.length === 1) {
        setEditMode(false);
      }
      deleteList(index);
    }
  };

  return (
    <div className='container'>
      <div className='title-container'>
        <div className='flex-row'>
          <h1 className='title'>Watchlist</h1>
          {editMode ? (
            <DangerBtn
              onClick={() => setEditMode(false)}
              margin='0 0 0 2rem'
              fontSize={'1rem'}
              padding='0.5rem 2rem'
            >
              Stop Editing
            </DangerBtn>
          ) : null}
        </div>
      </div>
      <Nav
        deleteList={deleteListByIndexHandler}
        isEmpty={lists.length === 0}
        tabHandler={tabHandler}
        activeList={activeList}
        lists={lists}
        openCreateListModal={openCreateListModal}
        setIsGrid={setIsGrid}
        isGrid={isGrid}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        deleteHandler={deleteHandler}
        setEditMode={setEditMode}
        editMode={editMode}
      />

      {content}
    </div>
  );
};

export default Watchlist;
