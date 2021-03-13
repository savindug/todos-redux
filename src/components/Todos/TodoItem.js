import { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editTodo, removeTodo } from '../../redux/actions/todoActions';

export const TodoItem = ({ todo }) => {
  const [id, setid] = useState(0);
  const [title, settitle] = useState('');
  const [status, setstatus] = useState();
  const [color, setcolor] = useState();
  const [_priority, set_priority] = useState('Priority');
  const [time, settime] = useState('');

  const dispatch = useDispatch();
  //controls
  const [formControlCls] = useState('bg-transparent border-0');
  const [editable, seteditable] = useState(false);

  const submitEdit = () => {
    const todoData = {
      id: id,
      title: title,
      completed: status,
      color: color,
      priority: _priority,
      timestamp: time,
    };

    dispatch(editTodo(todoData));

    seteditable(false);
  };

  const deleteTodo = (id) => {
    dispatch(removeTodo(id));
  };

  useEffect(() => {
    const initForm = () => {
      if (todo.id) {
        setid(todo.id);
      }
      if (todo.title) {
        settitle(todo.title);
      }
      if (todo.color) {
        setcolor(todo.color);
      }
      if (todo.completed) {
        setstatus(todo.completed);
      } else {
        setstatus(todo.completed);
      }
      if (todo.priority) {
        set_priority(todo.priority);
      }
      if (todo.timestamp) {
        settime(todo.timestamp);
      }
    };
    initForm();
  }, [todo]);

  return (
    <Container className="my-2">
      <Row className="alert alert-info">
        <InputGroup>
          <Col md={1} style={{ backgroundColor: color }}>
            {/* <Image src="holder.js/171x180" roundedCircle /> */}
          </Col>
          <Col md={5}>
            <FormControl
              disabled={editable ? false : true}
              className={editable ? 'text-dark' : formControlCls}
              placeholder={title}
              onChange={(e) => settitle(e.target.value)}
              aria-describedby="basic-addon2"
            />
          </Col>
          <Col md={2}>
            {editable ? (
              <Form.Control
                as="select"
                size="sm"
                custom
                value={_priority}
                onChange={(e) => set_priority(e.target.value)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Control>
            ) : (
              <p className="text-capitalize">{_priority}</p>
            )}
          </Col>
          <Col md={2}>
            {editable ? (
              <Form.Control
                as="select"
                size="sm"
                custom
                onChange={(e) => setstatus(e.target.value)}
              >
                <option value="true">Completed</option>
                <option value="false">Uncompleted</option>
              </Form.Control>
            ) : (
              [
                status === true ? (
                  <p className="text-capitalize"> completed </p>
                ) : (
                  <p className="text-capitalize"> uncompleted </p>
                ),
              ]
            )}
          </Col>
          <Col md={2}>
            <InputGroup.Append>
              {editable ? (
                <Button
                  variant="success"
                  className="btn btn-sm text-light"
                  onClick={() => submitEdit()}
                >
                  <i class="fas fa-check-circle"></i>
                </Button>
              ) : (
                <>
                  <Button
                    variant="warning"
                    className="btn btn-sm text-light"
                    onClick={() => seteditable(true)}
                  >
                    <i class="far fa-edit"></i>
                  </Button>{' '}
                  &nbsp;
                  <Button
                    className="btn btn-sm"
                    variant="danger"
                    onClick={() => deleteTodo(id)}
                  >
                    <i class="far fa-trash-alt"></i>
                  </Button>
                </>
              )}
            </InputGroup.Append>
          </Col>
        </InputGroup>
      </Row>
    </Container>
  );
};
