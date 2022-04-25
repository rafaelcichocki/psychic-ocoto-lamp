import React from "react";

export const TaskModal = () => {
  async function handlesubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const FormDataObj = new FormData(form) as any;

    // change checkbox to boolean value
    const checkbox = form[3] as HTMLInputElement;
    FormDataObj.delete("isWholeDay");
    FormDataObj.append(checkbox.name, "" + checkbox.checked);

    await fetch(form.action, {
      method: form.method,
      body: new URLSearchParams([...FormDataObj]),
    }).then(data => data.json())
    .then(body => form.reset())
    .catch(e => alert(e));
  }
  return (
    <form name="Task" method="POST" action="/api/task" onSubmit={handlesubmit}>
      <input type="text" name="name" placeholder="Task name"></input>
      <input
        type="text"
        name="start"
        placeholder={new Date().toLocaleString()}
      ></input>
      <input
        type="text"
        name="end"
        placeholder={new Date(Date.now() + 1000 * 60 * 60).toLocaleString()}
      ></input>
      <label>
        Whole day event:
        <input name="isWholeDay" type="checkbox" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
