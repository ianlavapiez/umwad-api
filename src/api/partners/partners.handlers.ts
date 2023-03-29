import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { Partner, Partners, PartnerWithId } from './partners.model';

export async function createOne(
  req: Request<{}, PartnerWithId, Partner>,
  res: Response<PartnerWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await Partners.insertOne(req.body);

    if (!insertResult.acknowledged)
      throw new Error('Error inserting partner information.');

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
    const result = await Partners.findOneAndDelete({
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
  res: Response<PartnerWithId[]>,
  next: NextFunction,
) {
  try {
    const partners = await Partners.find().toArray();

    res.json(partners);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, PartnerWithId, {}>,
  res: Response<PartnerWithId>,
  next: NextFunction,
) {
  try {
    const result = await Partners.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!result) {
      res.status(404);
      throw new Error('Partner information not found.');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, PartnerWithId, Partner>,
  res: Response<PartnerWithId>,
  next: NextFunction,
) {
  try {
    const result = await Partners.findOneAndUpdate(
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
      throw new Error('Partner information not found.');
    }

    res.json(result.value);
  } catch (error) {
    next(error);
  }
}
