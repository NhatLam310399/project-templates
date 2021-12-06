import { useState } from "react";
import { Link } from "./styles";
import ProgressBoard, { ITask } from "designs/ProgressBoard";

interface IYourStep {}

const YourStep: React.FC<IYourStep> = props => {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      name: "Sign up for Printful",
      message: <p>Sign up for PrintFul</p>,
      isDone: true,
    },
    {
      name: "Confirm your email",
      message: (
        <p>
          <Link to="/verify">Verify your email</Link> to get relevant updates
          and the welcome guide
        </p>
      ),
      isDone: false,
    },
    {
      name: "Create a product template",
      message: (
        <p>
          <Link to="/verify">Pick a product</Link>, add a design, save it, and
          use it as you like
        </p>
      ),
      isDone: false,
    },
    {
      name: "Connect your store",
      message: (
        <p>
          <Link to="/store">Choose an e-commerce platform or marketplace</Link>{" "}
          to start selling
        </p>
      ),
      isDone: false,
    },
    {
      name: "Add products to your store",
      message: (
        <p>
          Create new products or use product templates and add them to your
          store
        </p>
      ),
      isDone: false,
    },
    {
      name: "Take care of billing",
      message: <p>Add a billing method so we can fulfill your orders</p>,
      isDone: true,
    },
    {
      name: "Order samples",
      message: (
        <p>Make an order and see what your product looks like in real life</p>
      ),
      isDone: true,
    },
  ]);

  return <ProgressBoard tasks={tasks} />;
};

export default YourStep;
