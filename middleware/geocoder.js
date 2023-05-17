import NodeGeocoder from "node-geocoder";

const options = {
  provider: 'openstreetmap'
};

const geocoder = NodeGeocoder(options)


export const geocodeLocation = async (location) => {
  try {
    const result = await geocoder.geocode(location);

    if (!result || !result[0]) {
      throw new Error("Invalid location");
    }

    const coordinates = [result[0].longitude, result[0].latitude];
    return coordinates;
  } catch (error) {
    console.log(error);
    throw new Error("Geocoding error");
  }
};
