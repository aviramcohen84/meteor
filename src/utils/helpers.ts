import { GroupedData, DataPoint } from "./types";

export const debounce = (func: Function, delay: number) => {
    let timeoutId : ReturnType<typeof setTimeout>;
  
    return ( ...args: any ) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }
  }

  export const findNearestYearByMass = (startYear: string, meteorsList: GroupedData, targetValue: number) => {
    const currentYear = Number(startYear);
    let lowerYear = currentYear - 1;
    let higherYear = currentYear + 1;
    while ((lowerYear >= 1000 || higherYear <= (new Date()).getFullYear())) {
      const findMassCountInYear = (year: number) => {
        if (typeof meteorsList[year] === 'undefined') return false;
        return meteorsList[year].filter((item: DataPoint) => Number(item.mass) > targetValue).length > 0;
      }
      if (findMassCountInYear(higherYear)) return higherYear;
      if (findMassCountInYear(lowerYear)) return lowerYear;
      lowerYear -= 1;
      higherYear += 1;
    }
    return null;
  }