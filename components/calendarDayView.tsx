import * as Task from "../services/database";

export const CalendarDayView = ({ tasks = [] }: Task.schema) => {
  return (
    <section>
      {tasks.map((task) => (
        <article key={task.id}>
          <h1>{task.name}</h1>
          <div>Start: {task.start?.toLocaleString()}</div>
          <div>End: {task.end?.toLocaleString()}</div>
        </article>
      ))}
    </section>
  );
};
