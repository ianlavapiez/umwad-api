import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { Program, Programs, ProgramWithId } from './programs.model';

export async function createOne(
  req: Request<{}, ProgramWithId, Program>,
  res: Response<ProgramWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await Programs.insertOne(req.body);

    if (!insertResult.acknowledged)
      throw new Error('Error inserting program information.');

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
    const result = await Programs.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });

    if (!result.value) {
      res.status(404);
      throw new Error('Parnter information not found.');
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function findAll(
  req: Request,
  res: Response<ProgramWithId[]>,
  next: NextFunction,
) {
  try {
    const programs = await Programs.find().toArray();

    res.json(programs);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, ProgramWithId, {}>,
  res: Response<ProgramWithId>,
  next: NextFunction,
) {
  try {
    const result = await Programs.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!result) {
      res.status(404);
      throw new Error('Program information not found.');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, ProgramWithId, Program>,
  res: Response<ProgramWithId>,
  next: NextFunction,
) {
  try {
    const result = await Programs.findOneAndUpdate(
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
      throw new Error('Program information not found.');
    }

    res.json(result.value);
  } catch (error) {
    next(error);
  }
}
