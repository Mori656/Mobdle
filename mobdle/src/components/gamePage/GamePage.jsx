import React, { useState } from 'react';
import Select from 'react-select';
import './GamePage.css'

const initialOptions = [
  { name: 'Zombie', image: 'https://minecraft.wiki/images/ZombieFace.png?d1bba', version: 'pre-alpha', health: 20, height: 1.95, behavior: ['Hostile'], movement: ['Walking '], dimension: ['Overworld ']},
  { name: 'Enderman', image: 'https://minecraft.wiki/images/EndermanFace.png?8ebeb', version: 'Beta 1.8', health: 200, height: 2.9, behavior: ['Neutral'], movement: ['Walking ','Teleportation '], dimension: ['End ', 'Overworld ', 'Nether ']},
];

const customStyles = {
    
  container: (styles) => ({
      ...styles,
      width: '100%',
      margin: '0 auto',
  }),

  control: (styles) => ({
    ...styles,
    backgroundColor: '#a0c4ff',
    borderRadius: '0',
    padding: '4px',
    color:'#F0F',
    borderColor: '#a0c4ff',
    fontSize: '3vh',
    cursor: 'pointer',
  }),

  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isFocused
      ? '#0c1a2b'
      : '#a0c4ff',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontSize: '3vh',
    ':active': {
      backgroundColor: '#ddd',
    },
  }),

  singleValue: (styles) => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }),

  menu: (styles) => ({
    ...styles,
    borderRadius: '0px',
    overflow: 'hidden',
    marginTop: '2px',
    backgroundColor: '#a0c4ff',
  }),

};

const formatOptionLabel = ({ name, image }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <img
      src={image}
      alt={name}
      style={{ width: 24, height: 24, borderRadius: 4 }}
    />
    {name}
  </div>
);

function GamePage() {
  const [options, setOptions] = useState(initialOptions);
  const [selectedOption, setSelectedOption] = useState(null);
  const [chosen, setChosen] = useState([]); // do poprawy

  // cała funkcja do poprawy wsm
  const handleSubmit = () => {
    if(selectedOption) {
      setChosen((prevChosen) => [selectedOption, ...prevChosen])
      setOptions((prevOptions) => prevOptions.filter(option => option.name !== selectedOption.name));
      setSelectedOption(null);
      console.log(chosen);
    }
  }  

  return (
    <div className='gp_mainContainer'>
      <div className='gp_guessingZone'>
        <Select options={options}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            placeholder="Wybierz opcję..."
            components={{
                DropdownIndicator:() => null,
                IndicatorSeparator:() => null,
            }}
            isClearable={true}
            value={selectedOption}
            onChange={setSelectedOption}
            key={options.length}
        />
        <button onClick={handleSubmit}>{'>>'}</button>
      </div>
      

      <div className='gp_chosenOptions'>
          <h2>Wybrane:</h2>
          {chosen.map((item, index) => (
          <div key={index} className='gp_chosenContainer'>
            <img src={item.image} alt={item.name} />
            <div>{item.version}</div>
            <div>{item.health}</div>
            <div>{item.height}</div>
            <div>{item.behavior}</div>
            <div>{item.movement}</div>
            <div>{item.dimension}</div>
          </div>
        ))}
          
      </div>


    </div>
  )
}

export default GamePage