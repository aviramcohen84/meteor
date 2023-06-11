export interface GeoLocation {
    type: string;
    coordinates: number[];
}

export interface DataPoint {
    lat: number;
    long: number;
    mass: string | number;
}

export interface DataItem {
    name: string;
    id: string;
    nametype: string;
    recclass: string;
    mass: string;
    fall: string;
    year: string;
    reclat: string;
    reclong: string;
    geolocation: GeoLocation;
}

export type GroupedData = {
    [year: string]: DataPoint[];
};


export interface MapProps {
    data: DataPoint[];
}

export interface FilterProps {
    years: string[];
    onSelect: Function;
    onMassChange: Function;
    selectedYear: string;
    massValue: number;
}

export interface AutocompleteProps {
    options: string[];
    input: string;
    noResultsText: string;
    maxResults: number;
    onSelect: (value: string) => void;
}