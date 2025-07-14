import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

interface AlertMessageProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

function AlertMessage({ show, onClose, message }: AlertMessageProps) {
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast show={show} onClose={onClose} delay={3000} autohide bg='info' className="text-white">
        <Toast.Body className="text-white"> {message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default AlertMessage;