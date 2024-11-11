"use server";

import { generateClient } from "aws-amplify/api";
import type { Schema } from "aws-amplify/datastore";

export const addBook = async (e: any) => {
  const client = generateClient<Schema>();

  try {
    // client.models
    // @ts-ignore
    const { errors, data: newBook } = await client.models.BookList.create({
      title: "The Alchemist",
      summary:
        "The Alchemist by Paulo Coelho is a novel about a shepherd boy named Santiago who travels across North Africa to find his Personal Legend, a hidden treasure near the Egyptian pyramids",
      isDone: false,
      createdAt: new Date(),
      due: new Date(),
    });

    return newBook;
  } catch (error) {}
};
