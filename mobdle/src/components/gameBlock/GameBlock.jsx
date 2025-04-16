import React from 'react';
import './GameBlock.css';

const Block = ({status, text}) => {
    return (
    <div className={`block ${status}`}>
        {Array.isArray(text) ?
        text.map((value, key) => (
            <p key={key}>{value}</p>
        )):text
    }
    </div>
  );
};

export default Block;