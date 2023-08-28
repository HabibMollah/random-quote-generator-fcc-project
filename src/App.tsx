import axios from 'axios';
import { useEffect, useState } from 'react';

type Quote = {
  author: string;
  quote: string;
};

export default function App() {
  const [data, setData] = useState<Quote[]>();
  const [error, setError] = useState('');
  const [quote, setQuote] = useState<Quote>();

  function randomIndex() {
    if (data) return Math.floor(Math.random() * data.length);
    return 0;
  }

  function randomQuote() {
    if (data) setQuote(data[randomIndex()]);
    return;
  }

  useEffect(() => {
    axios
      .get(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      )
      .then((res) => {
        setData(res.data.quotes);
        randomQuote();
      })
      .catch((err) => {
        setError('Something went wrong, please reload this page');
        console.error(err);
      });
  }, []);

  console.log(data);

  return (
    <div className="w-[100dvw] h-[100dvh]">
      <main
        className="mx-auto p-4 rounded-lg max-w-[640px] bg-green-800 text-white"
        id="quote-box">
        <p className="text-4xl font-medium" id="text">
          ❝{quote?.quote}❞
        </p>
        <p className="text-right text-xl font-medium" id="author">
          - {quote?.author}
        </p>
        <div className="flex justify-center items-center gap-8 font-medium">
          <button
            className="bg-white text-black rounded-lg px-8"
            onClick={randomQuote}
            id="new-quote">
            New Quote
          </button>
          <a
            className="bg-white text-black rounded-lg px-8"
            href="https://twitter.com/intent/tweet"
            target="_blank"
            id="tweet-quote">
            Tweet
          </a>
        </div>
        {/* error message */}
        <p className="text-red-500">{error}</p>
      </main>
    </div>
  );
}
