import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { getDomain } from '../utils/helpers';

/**
 * @component AddressInput
 * @returns {JSX.Element}
 */
export default function AddressInput(): JSX.Element {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // ! not fully completed yet
  return (
    <GooglePlacesAutocomplete
      selectProps={{
        placeholder: 'Enter an address...',
        onChange: async (address: any) => {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address.label}&key=${API_KEY}`
          );
          const data = await response.json();
          let geolocation: any = data.results[0].geometry.location;
          console.log(geolocation);

          const response2 = await fetch(
            `${getDomain()}/restaurant/getRestaurantsByDistance?numberOfItems=50&latitude=${
              geolocation.lat
            }&longitude=${geolocation.lng}`
          );
          const data2 = await response2.json();
          console.log(data2);

          const response3 = await fetch(
            `${getDomain()}/menu/getMenuItemsByDistance?numberOfItems=50&latitude=${geolocation.lat}&longitude=${
              geolocation.lng
            }`
          );
          const data3 = await response3.json();
          console.log(data3);
        }
      }}
      apiKey={API_KEY}
    />
  );
}
