import React from 'react';

export default function Input() {
  let isComposition = false;
  const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
  const handleComposition = (e) => {
    if (e.type === 'copositionend') {
      isComposition = false;
      if (isChrome) {
        handleChange(e);
      }
    } else {
      isComposition = true;
    }
  };
  const handleChange = (e) => {
    if (!isComposition) {
      const inputValue = e.tatget.value;
      console.log(inputValue);
    }
  };
  return (
    <input
      type="text"
      onCompositionStart={handleComposition}
      onCompositionEnd={handleComposition}
      onChange={handleChange}
    ></input>
  );
}
