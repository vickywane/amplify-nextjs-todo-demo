import { addBook } from "@/src/actions";
import Header from "@/src/components/header";
import { AuthGetCurrentUserServer } from "@/src/lib/utils/Auth";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import { Schema } from "aws-amplify/datastore";
import { useEffect } from "react";
import outputs from "@/amplify_outputs.json";

const getData = async () => {
  Amplify.configure(outputs, {
    ssr: true,
  });

  const client = generateClient<Schema>();
  const { data } = await client.models.BookList.list();

  return {
    data,
  };
};

export default async function Home() {
  const user = await AuthGetCurrentUserServer();
  const { data } = await getData();

  console.log("INCOMING DATA =>", data);

  return (
    <div>
      <Header />

      <div className="flex-col flex mt-12">
        <h1 className="text-2xl">Hello {user?.signInDetails?.loginId} </h1>

        <p>Add a book to your reading list;</p>

        <form onSubmit={addBook} action="">
          <div className="flex flex-col">
            <label htmlFor="name">Book Name</label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Book Name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name">Completion Date </label>

            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Select Date"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={addBook}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Add Book
            </button>
          </div>

          {/* <button
            className="p-4 border border-2 border-[red]"
            onClick={addBook}
            type="submit"
          >
            Add Book
          </button> */}
        </form>

        <div className="mt-24">
          <ul>
            {data.map((book) => {
              return (
                <li key={book.id}>
                  <h3>{book.title}</h3>
                  <p>{book.summary}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
