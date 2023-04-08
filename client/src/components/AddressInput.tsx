import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { getDomain } from '../utils/helpers';
import Restaurant from '../../../types/interfaces/Restaurant';
import MenuItem from '../../../types/interfaces/MenuItem';
import AddressInputProps from '../../../types/interfaces/AddressInput';

/**
 * @component AddressInput
 * @notes https://tintef.github.io/react-google-places-autocomplete/docs/v2-to-v3/
 * @returns {React.FC<AddressInputProps>}
 */
const AddressInput: React.FC<AddressInputProps> = (props: AddressInputProps) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  /**
   * @function fetchGeolocation gets the geolocation from an address using the Google geocoder api
   * @returns {any} Geolocation
   */
  async function fetchGeolocation(address: any) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address.label}&key=${API_KEY}`
    );
    const data = await response.json();
    return data.results[0].geometry.location;
  }

  /**
   * @function getRestaurantsByDistance gets the restaurants that are closest to the given geolocation
   * @returns {Promise<Array<Restaurant>>}
   */
  async function getRestaurantsByDistance(geolocation: any): Promise<Array<Restaurant>> {
    const rawRestaurants = await fetch(
      `${getDomain()}/restaurant/getRestaurantsByDistance?numberOfItems=${props.numberOfRestaurants}&latitude=${
        geolocation.lat
      }&longitude=${geolocation.lng}`
    );
    const restaurants: Array<Restaurant> = await rawRestaurants.json();
    return restaurants;
  }

  /**
   * @function getMenuItemsByDistance gets the menu items that are closest to the given geolocation
   * @returns {Promise<Array<MenuItem>>}
   */
  async function getMenuItemsByDistance(geolocation: any): Promise<Array<MenuItem>> {
    const rawMenuItems = await fetch(
      `${getDomain()}/menu/getMenuItemsByDistance?numberOfItems=${props.numberOfMenuItems}&latitude=${
        geolocation.lat
      }&longitude=${geolocation.lng}`
    );
    const menuItems: Array<MenuItem> = await rawMenuItems.json();
    return menuItems;
  }

  return (
    <div style={{ padding: '0 4rem 1rem 4rem' }}>
      <GooglePlacesAutocomplete
        selectProps={{
          placeholder: 'Enter an address...',
          onChange: async (address: any) => {
            const geolocation: Geolocation = await fetchGeolocation(address);
            const restaurants: Array<Restaurant> = await getRestaurantsByDistance(geolocation);
            const menuItems: Array<MenuItem> = await getMenuItemsByDistance(geolocation);

            props.setRestaurants(restaurants);
            props.setMenuItems(menuItems);
          }
        }}
        apiKey={API_KEY}
      />
    </div>
  );
};

export default AddressInput;
