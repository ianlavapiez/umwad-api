import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { Blog, Blogs, BlogWithId } from './blogs.model';

export async function createOne(
  req: Request<{}, BlogWithId, Blog>,
  res: Response<BlogWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await Blogs.insertOne(req.body);

    if (!insertResult.acknowledged)
      throw new Error('Error inserting blog information.');

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
    const result = await Blogs.findOneAndDelete({
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
  res: Response<BlogWithId[]>,
  next: NextFunction,
) {
  try {
    const blogs = await Blogs.find().toArray();

    res.json(blogs);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, BlogWithId, {}>,
  res: Response<BlogWithId>,
  next: NextFunction,
) {
  try {
    const result = await Blogs.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!result) {
      res.status(404);
      throw new Error('Blog information not found.');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, BlogWithId, Blog>,
  res: Response<BlogWithId>,
  next: NextFunction,
) {
  try {
    const result = await Blogs.findOneAndUpdate(
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
      throw new Error('Blog information not found.');
    }

    res.json(result.value);
  } catch (error) {
    next(error);
  }
}
