import { useState, useEffect } from 'react';
import Map from './components/Map';
import Filters from './components/Filters';
import { DataItem, DataPoint, GroupedData } from './utils/types';
import { debounce, findNearestYearByMass } from './utils/helpers';
import { metoresFetchUrl } from './utils/consts';

const FindMeteor: React.FC = () => {
  const [ meteorsByYear, setMeteorsByYear ] = useState<GroupedData>({});
  const [ selectedYear, setSelectedYear ] = useState<string>('');
  const [ minMass, setMinMass ] = useState<number>(0);
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  useEffect(() => {
    fetchMeteors();
  }, []);

  const onMassChange = (value: number) => {
    setMinMass(value);
    setErrorMessage('');
  }

  const filterMeteorsByMass = () => {
    if (selectedYear) {
      const filteredByMass = meteorsByYear[selectedYear].filter((item: DataPoint) => Number(item.mass) > minMass);
      if (filteredByMass.length === 0) {
        const foundYearByMass = findNearestYearByMass(selectedYear, meteorsByYear, minMass);
        if (foundYearByMass) {
          setSelectedYear(foundYearByMass.toString());
          setErrorMessage(`Meteor with mass of ${minMass} was not found in ${selectedYear}. jumping to ${foundYearByMass} - the first-year where there is a mass that fits the criteria`)
        } else {
          setMinMass(0);
          setSelectedYear('');
          setErrorMessage(`Meteor with mass of ${minMass} was not found in ${selectedYear} and in any other year. please start a new search`)
        }
        return [];
      }
      return filteredByMass;
    }
    return [];
  }

  const groupByYear = (data: DataItem[]): GroupedData => {
    return data.reduce((result: GroupedData, item: DataItem) => {
      if (item.year && item.geolocation) {
        const year = (new Date(item.year)).getFullYear();
        if (!result[year]) {
          result[year] = [];
        }
        result[year].push({
          lat: item.geolocation.coordinates[1],
          long: item.geolocation.coordinates[0],
          mass: item.mass
        });
      }
      return result;
    }, {});
  };

  const fetchMeteors = async () => {
    const response = await fetch(metoresFetchUrl);
    const data = await response.json();
    setMeteorsByYear(groupByYear(data))
  }

  const meteors = filterMeteorsByMass();

  return (
    <div>
      <div className={ `hero${ selectedYear ? ' mini' : '' }` }>
        <h1 className="title">The Meteor Finder</h1>
        <Filters
          years={ Object.keys(meteorsByYear) }
          onMassChange={ debounce(onMassChange, 400) }
          massValue={ minMass }
          selectedYear={ selectedYear }
          onSelect={ setSelectedYear } />
        <div className="error">{ errorMessage }</div>
      </div>
      { selectedYear ? <Map data={ meteors } /> : null }
    </div>
  );
};

export default FindMeteor;
