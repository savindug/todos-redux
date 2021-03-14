import { useState, useEffect, useRef } from 'react';
import { ButtonGroup, Button, Form, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { addTodo } from '../../redux/actions/todoActions';

export const AddTodo = (props) => {
  const colors = [
    {
      value: 'primary',
      key: '#1266F1',
    },
    {
      value: 'secondary',
      key: '#B23CFD',
    },
    {
      value: 'success',
      key: '#00B74A',
    },
    {
      value: 'danger',
      key: '#F93154',
    },
    {
      value: 'warning',
      key: '#FFA900',
    },
    {
      value: 'info',
      key: '#39C0ED',
    },
    {
      value: 'light',
      key: '#FBFBFB',
    },
    {
      value: 'dark',
      key: '#262626',
    },
  ];

  const [id, setid] = useState();
  const [title, settitle] = useState('');
  const [status] = useState(false);
  const [color, setcolor] = useState();
  const [_priority, set_priority] = useState('medium');
  const [time, setTime] = useState();
  const highPrio = useRef();
  const medPrio = useRef();
  const lowPrio = useRef();
  const [colorPallet, setcolorPallet] = useState('');

  const dispatch = useDispatch();

  const CreateTodo = () => {
    setid(Math.floor(Date.now() / 1000));
    setTime(moment().format('MM ddd, YYYY hh:mm:ss a'));
    const todoData = {
      id: id,
      title: title,
      completed: status,
      color: color,
      priority: _priority,
      timestamp: time,
    };

    if (
      todoData.id !== null &&
      todoData.title !== null &&
      todoData.completed !== null &&
      todoData.color !== null &&
      todoData.priority !== null &&
      todoData.timestamp !== null
    ) {
      dispatch(addTodo(todoData));
    }

    console.log(JSON.stringify(todoData));
  };

  const PriorityBtnGroup = () => {
    useEffect(() => {
      const priorityBtnHandle = () => {
        if (_priority === 'low') {
          lowPrio.current.setAttribute('disabled', true);
        }
        if (_priority === 'medium') {
          medPrio.current.setAttribute('disabled', true);
        }
        if (_priority === 'high') {
          highPrio.current.setAttribute('disabled', true);
        }
      };
      priorityBtnHandle();
    }, []);

    return (
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="secondary"
          ref={lowPrio}
          onClick={() => set_priority('low')}
        >
          Low
        </Button>
        <Button
          variant="info"
          ref={medPrio}
          onClick={() => set_priority('medium')}
        >
          Medium
        </Button>
        <Button
          variant="danger"
          ref={highPrio}
          onClick={() => set_priority('high')}
        >
          High
        </Button>
      </ButtonGroup>
    );
  };

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
        <Form>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => settitle(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group>
                <PriorityBtnGroup />
              </Form.Group>
            </Col>
            <Col md={4}></Col>
            <Col md={4}>
              <Form.Group>
                <Form.Control
                  as="select"
                  size="sm"
                  custom
                  value={color}
                  className={'text-capitalize'}
                  style={{ backgroundColor: colorPallet }}
                  onChange={(e) => {
                    setcolor(e.target.value);
                    setcolorPallet(e.target.value);
                  }}
                >
                  {colors.map((x) => (
                    <option
                      className="text-capitalize"
                      value={x.key}
                      key={x.value}
                    >
                      {x.value}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="d-flex w-100 justify-content-center"
          onClick={() => {
            props.onHide();
            CreateTodo();
          }}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
