import React, { useState, useEffect } from 'react';
import AutoComplete from './AutoComplete';
import { FilterProps } from '../utils/types';

const Filters: React.FC<FilterProps> = ({ years, onSelect, onMassChange, selectedYear, massValue }) => {
    useEffect(() => {
        setInput(selectedYear)
    }, [selectedYear])

    useEffect(() => {
        setMass(massValue === 0 ? '' : massValue.toString())
    }, [massValue])

    const [input, setInput] = useState<string>('');
    const [mass, setMass] = useState<string>('');
    const [hideAutocomplete, setHideAutocomplete] = useState<boolean>(false);

    const handleMassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMass(event.target.value);
        if (typeof onMassChange === "function") onMassChange(Number(event.target.value));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHideAutocomplete(false);
        setInput(event.target.value);
    };

    const handleAutocompleteChange = (value: string) => {
        setInput(value);
        handleYearSelect();
    }

    const handleYearSelect = () => {
        setHideAutocomplete(true);
        if (typeof onSelect === "function") onSelect(input);
    }

    return (
        <div className="filters">
            <div className="text-input">
                <input 
                    className="text-field"
                    type="text"
                    value={ input } 
                    onChange={ handleChange } 
                    placeholder="Select a Year" />
            </div>
            { input.length > 0 && !hideAutocomplete ?
                <div className="year-autocomplete">
                    <AutoComplete 
                        options={ years } 
                        input={ input }
                        noResultsText="no years found"
                        maxResults={ 12 }
                        onSelect={ handleAutocompleteChange } />
                </div> : null }

            <div className="text-input mass-select">
                <input 
                    className="text-field"
                    type="text"
                    value={ mass } 
                    onChange={ handleMassChange } 
                    placeholder="Select Mass" />
            </div>
        </div>
    );
};

export default Filters;
