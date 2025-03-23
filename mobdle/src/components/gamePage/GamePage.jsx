import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './GamePage.css'
import Block from '../gameBlock/GameBlock';
import axios from 'axios';

const versions = [
  "pre-alpha",
  "alpha 1.0.8",
  "alpha 1.0.11",
  "alpha 1.0.14",
  "alpha 1.2.0",
  "beta 1.2",
  "beta 1.4",
  "beta 1.7",
  "beta 1.8",
  "1.0",
  "1.2",
  "1.2.1",
  "1.3",
  "1.4",
  "1.4.2",
  "1.5",
  "1.6",
  "1.6.1",
  "1.7",
  "1.8",
  "1.9",
  "1.10",
  "1.11",
  "1.12",
  "1.13",
  "1.14",
  "1.15",
  "1.16",
  "1.16.2",
  "1.17",
  "1.18",
  "1.19",
  "1.20",
  "1.20.5",
  "1.21",
  "1.21.4",
]

const initialOptions = [
  { name: 'Zombie', image: 'https://minecraft.wiki/images/ZombieFace.png?d1bba', version: 0, health: 20, height: 1.95, behavior: ['Hostile'], movement: ['Walking'], dimension: ['Overworld']},
  { name: 'Enderman', image: 'https://minecraft.wiki/images/EndermanFace.png?8ebeb', version: 9, health: 200, height: 2.9, behavior: ['Neutral'], movement: ['Walking','Teleportation'], dimension: ['End', 'Overworld', 'Nether']},
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
  const [triedOptions, setTriedOptions] = useState([]);
  const [chosenMob, setChosenMob] = useState([]);

  const checkStatus = (info) => {
    const selectedValue = selectedOption[info];
    const chosenValue = chosenMob[info];
  
    if (JSON.stringify(selectedValue) === JSON.stringify(chosenValue)) {
      return 'correct';
    }

    if (Array.isArray(selectedValue)) {
      if (selectedValue.some((val) => chosenValue.includes(val))) {
        return 'partial';
      }
    }
  
    return 'wrong';
  };

  const checkStatus2 = (info) => {
    const selectedValue = selectedOption[info];
    const chosenValue = chosenMob[info];
    if (selectedValue == chosenValue) {
      return 'correct'
    } else if (selectedValue < chosenValue ) {
      return 'more'
    } else {
      return 'less'
    }
  };

  const handleSubmit = () => {
    if(selectedOption) {

      const tmp = { 
        name: selectedOption.name, 
        image: selectedOption.image, 
        version: selectedOption.version, 
        versionStatus: checkStatus2('version'),
        health: selectedOption.health, 
        healthStatus: checkStatus2('health'),
        height: selectedOption.height, 
        heightStatus: checkStatus2('height'),
        behavior: selectedOption.behavior, 
        behaviorStatus: checkStatus('behavior'),
        movement: selectedOption.movement, 
        movementStatus: checkStatus('movement'),
        dimension: selectedOption.dimension,
        dimensionStatus: checkStatus('dimension')
      }

      setTriedOptions((prevChosen) => [tmp, ...prevChosen])
      setOptions((prevOptions) => prevOptions.filter(option => option.name !== selectedOption.name));
      setSelectedOption(null);
    }
  }  

  const preview = () => {
    console.log(chosenMob)
    console.log(triedOptions)
    
  }

  const getRandomMob = () => {
    const i = Math.floor(Math.random() * options.length);
    return options[i];
  }

  useEffect(() => {
    // Pobieranie danych z backendu
    axios.get('http://localhost:5000/api/mobs')
      .then(res => setOptions(res.data))
      .catch(err => console.error(err));
  }, []);


  useEffect(() => {
    const savedDate = localStorage.getItem('lastMobDate');
    const savedMob = localStorage.getItem('lastMob');

    const today = new Date().toDateString();

    if (savedDate !== today){
      const randomMob = getRandomMob();
      localStorage.setItem('lastMobDate',today);
      localStorage.setItem('lastMob',JSON.stringify(randomMob));
      setChosenMob(randomMob);
    } else if (savedMob) {
      setChosenMob(JSON.parse(savedMob));
    }
  }, []);


  return (
    <div className="mainContainer">
                    
      <div className="contentContainer">
        <div className="logo">
            MOBDLE
        </div>

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
                isSearchable={true}
                getOptionLabel={(e) => e.name}
            />
            <button onClick={handleSubmit}>{'>>'}</button>
            <button onClick={preview}>{'?'}</button>
          </div>
          

          <div className='gp_chosenOptions'>

            <h2>Wybrane:</h2>
            <div className='gp_overflowBox'>
              {triedOptions.map((item, index) => (
                <div key={index} className='gp_chosenContainer'>
                  <img src={item.image} alt={item.name} />
                    <Block status={item.versionStatus} text={versions[item.version]}></Block>
                    <Block status={item.healthStatus} text={item.health}></Block>
                    <Block status={item.heightStatus} text={item.height}></Block>
                  {/* <div>{item.behavior.map((value, key) => (

                    <p key={key}>{value}</p>
                  ))}</div> */}
                    <Block status={item.behaviorStatus} text={item.behavior}></Block>
                    <Block status={item.movementStatus} text={item.movement}></Block>
                    <Block status={item.dimensionStatus} text={item.dimension}></Block>
                    
                </div>
              ))}
            </div>
              
          </div>


        </div>
      </div>
    </div>
  )
}

export default GamePage