import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

const QuoteWelcome = () => {
  const [quote, setQuote] = useState('');
  const [notificationShown, setNotificationShown] = useState(false);

  // Fetch the quote api from backend
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://quotes-virid.vercel.app/api');
        if (response.ok) {
          const data = await response.json();
          const randomQuote = data[Math.floor(Math.random() * data.length)].quote;
          setQuote(randomQuote);

          // Show notification only if it hasn't been shown yet
          if (!notificationShown) {
            showNotification("Welcome to React");
            setNotificationShown(true); // Set notificationShown to true once the notification is shown
          }
        } else {
          console.error('Error fetching quote:', response.status);
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    // Fetch quote when the component mounts
    fetchQuote();

    // Set up interval to fetch a new quote every 2 minutes
    const interval = setInterval(fetchQuote, 120000); // 2 minutes in milliseconds

    // Clean up the interval to avoid memory leaks
    return () => clearInterval(interval);
  }, [notificationShown]); // Add notificationShown as a dependency to useEffect

  // Toastify notification
  const showNotification = message => {
    toast('💻 Welcome to React', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="quote-welcome">
      <div className='quote-container'>
        <h1>"Welcome Quote of the Day."</h1>
        <p>{quote}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuoteWelcome;
