import React from 'react';
import InputNumber from './InputNumber';

const inputNumberStyle = {
  margin: '0 5px',
};

const FromEvery = ({ value, onChange, front, back, fromMin = 0, fromMax = 59, everyMin = 1, everyMax = 59, translate }) => {

  const splits = value.split('/');
  const every = splits[1];

  const notifyChange = (every) => {
    const s = `*/${every}`;
    onChange && onChange(s);
  };

  const handleEveryChange = (v) => {
    notifyChange(v);
  };

  return (
    <span>
      {front}
      <InputNumber
        translate={translate}
        min={everyMin}
        max={everyMax}
        value={every}
        style={{ ...inputNumberStyle }}
        onChange={handleEveryChange}
      />
      {back}
    </span>
  );
};

export default FromEvery;
