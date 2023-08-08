// src/CurrentDateTime.js

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(format(new Date(), 'EEEE, MMMM d, yyyy h:mma'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{currentDateTime}</p>
    </div>
  );
};

export default CurrentDateTime;
