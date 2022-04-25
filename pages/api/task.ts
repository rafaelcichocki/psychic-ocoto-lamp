import type { NextApiRequest, NextApiResponse } from 'next';
import * as Task from "../../services/database";

type Error = {
  error: string
}


const validatePayload = (payload:any): Task.Task | never => {
  if(!payload.name) {
    throw `Task requires name, but got: ${payload.name}`
  }
  // ToDo: more validations
  return payload as Task.Task
}

export default function handler(req: NextApiRequest, res:NextApiResponse) {
  if(req.method == "POST") {
    PostTask(req, res);
  } else if (req.method = "GET") {
    GetTask(req, res);
  } else {
    res.status(400).json({
      error: "Bad Request"
    })
  }
}

const PostTask = (req:NextApiRequest, res:NextApiResponse<Task.SavedTask | Error>) => {
  try {
    console.log(req.body);
    const task = validatePayload(req.body);
    const createdTask = Task.create(task);
    res.status(200).json(createdTask);
  } catch(error: any) {
    res.status(500).json({
      error: error.toString()
    })
  }
}

const GetTask = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(Task.readAll());
  } catch(error: any) {
    res.status(500).json({
      error: error.toString()
    })
  }
}
