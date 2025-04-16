import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './GamePage.css'
import Block from '../gameBlock/GameBlock';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { versions } from './gamePageDependencies/versions';

import { useGameStore } from '../../stores/gameStore';
import { useAuthStore } from '../../stores/authStore';


function GamePage() {
  const [selectedOption, setSelectedOption] = useState(null);

  const { 
    options, setOptions, modifyOptions,
    chosenMob, setChosenMob,
    triedOptions, setTriedOptions, modifyTriedOptions,
    wonToday, setWonToday,
  } = useGameStore()

  const {
    isLoggedIn
  } = useAuthStore()

  const gameReset = () => {
    const lastGameDate = localStorage.getItem('lastGameDate');
    const today = new Date().toDateString();
    if (today !== lastGameDate || !lastGameDate) {
      localStorage.setItem('lastGameDate', today);
      localStorage.setItem('wonToday', 'false');

      localStorage.removeItem('triedOptions');
      localStorage.removeItem('options');

      setOptions();
    }
  }

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
    if (selectedValue === chosenValue) {
      return 'correct'
    } else if (selectedValue < chosenValue ) {
      return 'more'
    } else {
      return 'less'
    }
  };

  const checkWin = async (block) => {
    if(block.versionStatus !== 'correct' ||
      block.healthStatus !== 'correct' ||
      block.heightStatus !== 'correct' ||
      block.behaviorStatus !== 'correct' ||
      block.movementStatus !== 'correct' ||
      block.dimensionStatus !== 'correct'
    ){return}
    else{
      const wc = document.getElementsByClassName("gp_winContainer")[0];
      wc.style.display = "flex" ;
      
      const token = localStorage.getItem('token');
      if (token) {
        try {
        const login = localStorage.getItem('login');
      
        await axios.post(`http://localhost:5000/api/leaderboard/add`, {
          nickname: login,
          guessNumber: triedOptions.length + 1
        }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        await axios.patch(`http://localhost:5000/api/users/win/${login}`, {}, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
      
        }catch (err) {
          console.error("Błąd przy wysyłaniu danych do API:", err.response?.data || err.message);
        }
      } else {
        localStorage.setItem('wonToday', 'true');
      }
    }
  }

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

      checkWin(tmp);
      modifyTriedOptions(tmp);
      // modifyOptions();
      setSelectedOption(null);
    }
  }  

  const preview = () => {
    console.log(chosenMob)
    console.log(triedOptions)
    console.log(wonToday);
    // localStorage.clear()
  }


  useEffect(() => {
    gameReset();
    setChosenMob();
    setWonToday();
    setTriedOptions();
    // localStorage.clear()
  }, []);

  useEffect(() => {
    modifyOptions();
  }, [triedOptions])

  return (
    <div className="mainContainer">
                    
      <div className="contentContainer">
        <div className="logo">
            MOBDLE
        </div>

        {!isLoggedIn && 
          <div className='gp_loginWarning'>
            Log in to save your score!
          </div>
        }

        <div className='gp_mainContainer'>
        {wonToday == false && (
          <div className='gp_guessingZone'>
            <Select options={options}
                styles={customStyles}
                formatOptionLabel={formatOptionLabel}
                placeholder="Choose a mob..."
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
        )}
          {triedOptions.length>0 && 
          <div className='gp_chosenOptions'>

            <h2>Chosen mobs:</h2>
            <div className='gp_overflowBox'>
              <div className='gp_overflowBoxFlip'>

                <div className='gp_categories'>
                  <div>Mob</div>
                  <div>Version</div>
                  <div>Hp</div>
                  <div>Height</div>
                  <div>Behavior</div>
                  <div>Movement</div>
                  <div>Dimension</div>
                </div>

                {triedOptions.map((item, index) => (
                  item?(
                  <div key={index} className='gp_chosenContainer'>
                    <img src={item.image} alt={item.name} title={item.name} />
                      <Block status={item.versionStatus} text={versions[item.version]}></Block>
                      <Block status={item.healthStatus} text={item.health}></Block>
                      <Block status={item.heightStatus} text={item.height}></Block>
                      <Block status={item.behaviorStatus} text={item.behavior}></Block>
                      <Block status={item.movementStatus} text={item.movement}></Block>
                      <Block status={item.dimensionStatus} text={item.dimension}></Block>
                  </div>) : null                  
                ))}

              </div>
            </div>
          </div>}
        </div>

        <div className='gp_winContainer'>
          <p>Congratulations!</p>
          <p>Your score is: {triedOptions.length}</p>
          <p>You can see best scores on the leaderboard:</p>
          <Link to="/">
              <button className='gp_button'>Leaderbaord</button>
          </Link>
        </div>

      </div>
    </div>
  )
};

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
    fontSize: '24px',
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
    fontSize: '24px',
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

export default GamePage