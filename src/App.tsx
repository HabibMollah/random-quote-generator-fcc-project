import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { MdLoop } from 'react-icons/md';

type Quote = {
  author: string;
  quote: string;
};

type Data = {
  quotes: Quote[];
};

export default function App() {
  const [quote, setQuote] = useState<Quote>();

  const { data, error } = useQuery<Data, Error>({
    queryKey: ['quotes'],
    queryFn: () =>
      axios
        .get(
          'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
        )
        .then((res) => res.data),
  });

  console.log(data);

  useEffect(() => {
    setQuote(data?.quotes[Math.floor(Math.random() * data.quotes.length)]);
  }, [data]);

  // function randomIndex() {
  //   return Math.floor(Math.random() * data.length);
  // }

  console.log(data);

  return (
    <div className="w-[100dvw] h-[100dvh] bg-green-200 grid place-content-center">
      <main
        className="mx-auto p-4 rounded-lg px-16 min-h-[180px] max-w-[640px] bg-green-800 text-white"
        id="quote-box">
        <p className="text-4xl" id="text">
          ❝{quote?.quote}❞
        </p>
        <p className="text-right text-2xl font-medium" id="author">
          - {quote?.author}
        </p>
        <div className="flex mt-8 justify-center items-center gap-8 font-medium">
          <button
            className="bg-white text-black rounded-lg px-8 py-2 text-lg"
            onClick={() =>
              setQuote(
                data?.quotes[Math.floor(Math.random() * data.quotes.length)]
              )
            }
            id="new-quote">
            <MdLoop className="inline mr-1 -mt-1" />
            New Quote
          </button>
          <a
            className="bg-white text-black rounded-lg px-8 py-2 text-lg"
            href="https://twitter.com/intent/tweet"
            target="_blank"
            id="tweet-quote">
            <FaTwitter className="inline mr-1 -mt-1" />
            Tweet
          </a>
        </div>
        {/* error message */}
        <p className="text-red-500">{error}</p>
      </main>
    </div>
  );
}
