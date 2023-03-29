import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { TBI, TBIs, TBIWithId } from './tbis.model';

export async function createOne(
  req: Request<{}, TBIWithId, TBI>,
  res: Response<TBIWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await TBIs.insertOne(req.body);

    if (!insertResult.acknowledged)
      throw new Error('Error inserting TBI information.');

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
    const result = await TBIs.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });

    if (!result.value) {
      res.status(404);
      throw new Error('TBI information not found.');
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function findAll(
  req: Request,
  res: Response<TBIWithId[]>,
  next: NextFunction,
) {
  try {
    const tbis = await TBIs.find().toArray();

    res.json(tbis);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, TBIWithId, {}>,
  res: Response<TBIWithId>,
  next: NextFunction,
) {
  try {
    const result = await TBIs.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!result) {
      res.status(404);
      throw new Error(`Todo with id ${req.params.id} not found.`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, TBIWithId, TBI>,
  res: Response<TBIWithId>,
  next: NextFunction,
) {
  try {
    const result = await TBIs.findOneAndUpdate(
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
      throw new Error('TBI information not found.');
    }

    res.json(result.value);
  } catch (error) {
    next(error);
  }
}
