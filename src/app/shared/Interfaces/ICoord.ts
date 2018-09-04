export interface ICoord {
  accuracy: number;
  latitude: number;
  longitude: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
}
