import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { Startup, Startups, StartupWithId } from './startups.model';

export async function createOne(
  req: Request<{}, StartupWithId, Startup>,
  res: Response<StartupWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await Startups.insertOne(req.body);

    if (!insertResult.acknowledged)
      throw new Error('Error inserting startup information.');

    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>,
  next: NextFunction,
) {
  try {
    const result = await Startups.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });

    if (!result.value) {
      res.status(404);
      throw new Error('Startup information not found.');
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function findAll(
  req: Request,
  res: Response<StartupWithId[]>,
  next: NextFunction,
) {
  try {
    const startups = await Startups.find().toArray();

    res.json(startups);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, StartupWithId, {}>,
  res: Response<StartupWithId>,
  next: NextFunction,
) {
  try {
    const result = await Startups.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!result) {
      res.status(404);
      throw new Error('Startup information not found.');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, StartupWithId, Startup>,
  res: Response<StartupWithId>,
  next: NextFunction,
) {
  try {
    const result = await Startups.findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      },
      {
        returnDocument: 'after',
      },
    );

    if (!result.value) {
      res.status(404);
      throw new Error('Startup information not found.');
    }

    res.json(result.value);
  } catch (error) {
    next(error);
  }
}
