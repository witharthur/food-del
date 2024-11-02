const importImage = (name) => {
  try {
    return new URL(`./${name}.png`, import.meta.url).href;
  } catch (error) {
    console.error(`Failed to import image: ${name}.png`, error);
    return null;
  }
};

export const assets = {
  add_icon: importImage('add_icon'),
  order_icon: importImage('order_icon'),
  profile_image: importImage('profile_image'),
  upload_area: importImage('upload_area'),
  parcel_icon: importImage('parcel_icon'),
  list_icon: importImage('list_icon')
};

console.log('Loaded assets:', assets);