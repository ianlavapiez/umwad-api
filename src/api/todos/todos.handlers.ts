import { NextFunction, Request, Response } from 'express';

import { Todo, Todos, TodoWithId } from './todos.model';

// TODO: Check on how abstraction works

export async function createOne(
  req: Request<{}, TodoWithId, Todo>,
  res: Response<TodoWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await Todos.insertOne(req.body);

    if (!insertResult.acknowledged) throw new Error('Error inserting todo.');

    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
}
export async function findAll(
  req: Request,
  res: Response<TodoWithId[]>,
  next: NextFunction,
) {
  try {
    const result = await Todos.find();
    const todos = await result.toArray();

    res.json(todos);
  } catch (error) {
    next(error);
  }
}
