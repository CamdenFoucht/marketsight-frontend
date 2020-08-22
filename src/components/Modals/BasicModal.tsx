import React from 'react';
import Modal from 'react-modal';
import { useTheme } from 'emotion-theming';
import { MdClose } from 'react-icons/md';

type Props = {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
  children: any;
  height?: any;
};

const BasicModal = (props: Props) => {
  const theme: any = useTheme();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '550px',
      padding: '4rem 4rem',
      background: theme.background,
      color: theme.text,
      border: 'none',
      height: props.height || 'auto',
      zIndex: 10000,
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
      closeTimeoutMS={125}
      isOpen={props.isOpen}
      style={customStyles}
      onRequestClose={() => props.setOpen(false)}
    >
      <div className='modal__close' onClick={() => props.setOpen(false)}>
        <MdClose />
      </div>
      {props.children}
    </Modal>
  );
};

export default BasicModal;
