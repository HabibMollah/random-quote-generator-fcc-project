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

  useEffect(() => {
    axios
      .get(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      )
      .then((res) => setData(res.data.quotes))
      .catch((err) => {
        setError('Something went wrong, please reload this page');
        console.error(err);
      });
  }, []);

  function randomIndex() {
    if (data) return Math.floor(Math.random() * data.length);
    return 0;
  }

  function randomQuote() {
    if (data) setQuote(data[randomIndex()]);
    return;
  }

  console.log(data);

  return (
    <>
      <main id="quote-box">
        <section id="text">{quote?.quote}</section>
        <h2 id="author">{quote?.author}</h2>
        <button onClick={randomQuote} id="new-quote">
          New Quote
        </button>
        <a href="" id="tweet-quote"></a>
        {/* error message */}
        <p className="text-red-500">{error}</p>
      </main>
    </>
  );
}
