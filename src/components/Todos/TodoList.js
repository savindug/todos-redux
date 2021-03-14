import { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../redux/actions/todoActions';
import { AddTodo } from './AddTodo';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const [tab, setTab] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [group, setGroup] = useState(0);
  const [_priority, set_priority] = useState('all');
  // const [renderGroups, setRenderGroups] = useState(true);
  const [searchKey, setsearchKey] = useState('');

  const [tabularNavCls] = useState(
    'bg-secondary text-light border-bottom-0 border-secondary'
  );

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  const { todoList, loading, err } = todos;
  const [todoListFilter, setTodoListFilter] = useState([]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    const searchByTitle = () => {
      setTodoListFilter(
        todoListFilter.filter(
          (e) => searchKey === '' || e.title.includes(searchKey)
        )
      );
    };

    if (searchKey !== null) {
      searchByTitle();
    } else {
      if (tab === 1 && _priority === 'all') {
        setTodoListFilter(todoList.filter((e) => e.completed === true));
      }
      if (tab === 1 && _priority !== 'all') {
        setTodoListFilter(
          todoList.filter(
            (e) => e.completed === true && e.priority.includes(_priority)
          )
        );
      }
      if (tab === 0 && _priority === 'all') {
        setTodoListFilter(todoList.filter((e) => e.completed === false));
      }
      if (tab === 0 && _priority !== 'all') {
        setTodoListFilter(
          todoList.filter(
            (e) => e.completed === false && e.priority.includes(_priority)
          )
        );
      }
    }
  }, [searchKey, tab, _priority]);
  const todoFilter = () => {
    if (tab === 1 && _priority === 'all') {
      setTodoListFilter(todoList.filter((e) => e.completed === true));
    }
    if (tab === 1 && _priority !== 'all') {
      setTodoListFilter(
        todoList.filter(
          (e) => e.completed === true && e.priority.includes(_priority)
        )
      );
    }
    if (tab === 0 && _priority === 'all') {
      setTodoListFilter(todoList.filter((e) => e.completed === false));
    }
    if (tab === 0 && _priority !== 'all') {
      setTodoListFilter(
        todoList.filter(
          (e) => e.completed === false && e.priority.includes(_priority)
        )
      );
    }
  };
  // const resnderByGroups = () => {
  //   if (group === 1) {
  //     setRenderGroups(
  //       todoListFilter.reduce(function (r, a) {
  //         r[a.color] = r[a.color] || [];
  //         r[a.color].push(a);
  //         return r;
  //       }, Object.create(null))
  //     );
  //   }
  //   if (group === 2) {
  //     setRenderGroups(
  //       todoListFilter.reduce(function (r, a) {
  //         r[a.priority] = r[a.priority] || [];
  //         r[a.priority].push(a);
  //         return r;
  //       }, Object.create(null))
  //     );
  //   }
  //   console.log(renderGroups);
  // };

  useEffect(() => {
    todoFilter();
  }, [tab, todoList, _priority]);

  const TabularNav = () => {
    return (
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link
            className={tab === 0 ? tabularNavCls : 'text-dark'}
            eventKey="link-0"
            onClick={() => setTab(0)}
          >
            Todos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={tab === 1 ? tabularNavCls : 'text-dark'}
            eventKey="link-1"
            onClick={() => setTab(1)}
          >
            Completed
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  };

  return (
    <Container className="my-5">
      <>
        <Row className="my-5 mx-auto">
          <Col md={9}>
            <FormControl
              className="d-flex justify-content-start"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={(e) => setsearchKey(e.target.value)}
            />
          </Col>
          <Col md={1}>
            {searchKey !== '' ? (
              <Badge variant="secondary">
                {searchKey}
                <i
                  class="fas fa-times-circle"
                  onClick={() => setsearchKey(null)}
                ></i>
              </Badge>
            ) : (
              <></>
            )}
          </Col>
          <Col md={2} className="d-flex text-right justify-content-end">
            <Button
              className="my-auto"
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              <i class="fas fa-calendar-plus"></i>&nbsp;Add New
            </Button>
          </Col>
        </Row>
      </>
      <Row>
        <Col md={4} className="d-flex justify-content-start">
          Filter By
        </Col>
        <Col md={4} className="d-flex">
          <p className="p-1">Priority</p>
          <Form.Control
            as="select"
            size="sm"
            className="w-50"
            custom
            onChange={(e) => set_priority(e.target.value)}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Form.Control>
        </Col>
        <Col md={4} className="d-flex text-right justify-content-end">
          <p className="p-1">Date Range</p>
          <Form.Control
            className="w-50"
            as="select"
            size="sm"
            custom
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value=""></option>
          </Form.Control>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={4}>
          <TabularNav></TabularNav>
        </Col>
        <Col md={6}></Col>
        <Col md={2}>
          {' '}
          <Form.Control
            as="select"
            size="sm"
            custom
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="0">Group By</option>
            <option value="1">Color</option>
            <option value="2">Priority</option>
          </Form.Control>
        </Col>
      </Row>

      <AddTodo show={modalShow} onHide={() => setModalShow(false)} />

      {loading ? (
        <div className="my-5 mx-auto">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : err ? (
        <Alert>{err}</Alert>
      ) : (
        todoListFilter.map((e) => <TodoItem todo={e} />)
      )}
    </Container>
  );
};
