import React, { useState } from 'react';

const Sample = () => {
  const [changedText, setChangedText] = useState(false);

  const onClicked = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h1>Learning Testing</h1>
      <p>Hello World</p>
      {!changedText && <p>Its good to see you</p>}
      {changedText && <p>Changed!!</p>}
      <button onClick={onClicked}>Change Text</button>
    </div>
  );
};

export default Sample;
