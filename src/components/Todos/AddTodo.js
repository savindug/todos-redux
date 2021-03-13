import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { TodoItem } from './TodoItem';
export const AddTodo = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Todo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TodoItem />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};
