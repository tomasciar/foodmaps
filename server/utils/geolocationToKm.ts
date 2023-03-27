/**
 * @function distanceInKmBetweenEarthCoordinates
 * @returns {number}
 */
export default function distanceInKmBetweenEarthCoordinates(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

/**
 * @function degreesToRadians
 * @param degrees
 * @returns {number}
 */
function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
