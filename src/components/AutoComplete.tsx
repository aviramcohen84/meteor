import React from 'react';
import { AutocompleteProps } from '../utils/types'

const Autocomplete: React.FC<AutocompleteProps> = ({ options, input, noResultsText, maxResults, onSelect }) => {
  const filteredOptions = options.filter(option => option.includes(input));
  const resultsLegth = filteredOptions.length;

  return (
    <div className="autocomplete">
      {
        resultsLegth > 0 && resultsLegth < maxResults ? filteredOptions.map(option => {
          const onSelectWithValue = onSelect.bind(null, option);
          return (
            <div
              className="autocomplete-option"
              key={ option }
              onClick={ onSelectWithValue }>
                { option }
            </div>
          )
        }) : <div>{ resultsLegth === 0 ? noResultsText : "Too many results. be more specific" }</div>
      }
    </div>
  );
};

export default Autocomplete;
