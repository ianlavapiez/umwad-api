import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { Community, Communities, CommunityWithId } from './communities.model';

export async function createOne(
  req: Request<{}, CommunityWithId, Community>,
  res: Response<CommunityWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await Communities.insertOne(req.body);

    if (!insertResult.acknowledged)
      throw new Error('Error inserting community information.');

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
    const result = await Communities.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });

    if (!result.value) {
      res.status(404);
      throw new Error('Community information not found.');
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function findAll(
  req: Request,
  res: Response<CommunityWithId[]>,
  next: NextFunction,
) {
  try {
    const communities = await Communities.find().toArray();

    res.json(communities);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, CommunityWithId, {}>,
  res: Response<CommunityWithId>,
  next: NextFunction,
) {
  try {
    const result = await Communities.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!result) {
      res.status(404);
      throw new Error('Community information not found.');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, CommunityWithId, Community>,
  res: Response<CommunityWithId>,
  next: NextFunction,
) {
  try {
    const result = await Communities.findOneAndUpdate(
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
      throw new Error('Community information not found.');
    }

    res.json(result.value);
  } catch (error) {
    next(error);
  }
}
