import { Container } from 'react-bootstrap';
import { TodoList } from './Todos/TodoList';

export const Home = () => {
  return (
    <Container className="m-auto">
      <TodoList />
    </Container>
  );
};
