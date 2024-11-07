const importImage = (name, format = "png") => {
  try {
    return new URL(`./${name}.${format}`, import.meta.url).href;
  } catch (error) {
    console.error(`Failed to import image: ${name}.${format}`, error);
    return null;
  }
};

export const assets = {
  add_icon: importImage("add_icon"),
  order_icon: importImage("order_icon"),
  profile_image: importImage("profile_image"),
  upload_area: importImage("upload_area", "webp"),
  parcel_icon: importImage("parcel_icon"),
  list_icon: importImage("list_icon"),
  box_order: importImage("box"),
};

console.log("Loaded assets:", assets);
