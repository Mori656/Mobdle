import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate', image: 'https://minecraft.wiki/images/ZombieFace.png?d1bba'},
  { value: 'strawberry', label: 'Strawberry', image: 'https://minecraft.wiki/images/EndermanFace.png?8ebeb' },
  { value: 'vanilla', label: 'Vanilla', image: 'https://minecraft.wiki/images/SkeletonFace.png?652cd' }
];
  

const customStyles = {
    
    container: (styles) => ({
        ...styles,
        width: window.innerWidth < 768 ? '80%' : '60%',
        margin: '0 auto',
        marginTop:  window.innerWidth < 768 ? '2vh' : '5vh' 
      }),
  control: (styles) => ({
    ...styles,
    backgroundColor: '#a0c4ff',
    borderRadius: '0',
    padding: '4px',
    color:'#F0F',
    borderColor: '#a0c4ff',
    fontSize: window.innerWidth < 768 ? '2.5vh' : '3vh',
    
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isFocused
      ? '#0c1a2b'
      : '#a0c4ff',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontSize: window.innerWidth < 768 ? '2.5vh' : '3vh',

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
    borderRadius: '0px', // Bez zaokrągleń
    overflow: 'hidden', // Ukryj białe kreski
    marginTop: '2px',
    backgroundColor: '#a0c4ff', // Dopasuj tło
  }),



};

const formatOptionLabel = ({ label, image }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <img
      src={image}
      alt={label}
      style={{ width: 24, height: 24, borderRadius: 4 }}
    />
    {label}
  </div>
);
function GamePage() {
        return (
                <Select options={options}
                    styles={customStyles}
                    formatOptionLabel={formatOptionLabel}
                    placeholder="Wybierz opcję..."
                    components={{
                        DropdownIndicator:() => null,
                        IndicatorSeparator:() => null,
                    }}
                    isClearable={true}
                    >
                    
                </Select>
        )
    }

export default GamePage