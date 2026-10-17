import { Modal as AntModal, type ModalProps as AntModalProps } from 'antd';

export type ModalProps = AntModalProps;

/** مودال معمولی — هر محتوایی می‌تواند داشته باشد */
export const Modal = ({
  centered = true,
  okText = 'تأیید',
  cancelText = 'انصراف',
  destroyOnHidden = true,
  mask = { closable: false },
  width = 520,
  ...rest
}: ModalProps) => (
  <AntModal
    centered={centered}
    okText={okText}
    cancelText={cancelText}
    destroyOnHidden={destroyOnHidden}
    mask={mask}
    width={width}
    {...rest}
  />
);
