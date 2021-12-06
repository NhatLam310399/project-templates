import { useMemo } from "react";
import {
  ProgressBoardContainer,
  ListTasks,
  Task,
  ProgressBar,
  StatusText,
} from "./styles";
import TaskCheckIcon from "icons/TaskChecked";

export type ITask = {
  name: string;
  message: React.ReactNode;
  isDone: boolean;
};

interface IProgressBoardProps {
  className?: string;
  tasks: ITask[];
}

const ProgressBoard: React.FC<IProgressBoardProps> = ({ className, tasks }) => {
  const competedTasks = useMemo(
    () => tasks.filter(item => item.isDone),
    [tasks],
  );
  const incompleteTasks = useMemo(
    () => tasks.filter(item => !item.isDone),
    [tasks],
  );

  const allTasks = useMemo(
    () => [...competedTasks, ...incompleteTasks],
    [tasks],
  );

  return (
    <ProgressBoardContainer>
      <StatusText>{`${competedTasks.length} out of ${tasks.length} steps completed`}</StatusText>
      <ProgressBar.Container>
        {tasks.map((_, index) => (
          <ProgressBar.Item isCompleted={index < competedTasks.length} />
        ))}
      </ProgressBar.Container>
      <ListTasks>
        {allTasks.map(({ name, isDone, message }) => (
          <Task.Container key={name} isCompleted={isDone}>
            <TaskCheckIcon />
            <Task.Content>
              <Task.Title isCompleted={isDone}>{name}</Task.Title>
              {!isDone && message}
            </Task.Content>
          </Task.Container>
        ))}
      </ListTasks>
    </ProgressBoardContainer>
  );
};

export default ProgressBoard;
