import NodeGeocoder from "node-geocoder";

const options = {
  provider: 'openstreetmap'
};

export const geocoder = NodeGeocoder(options)

