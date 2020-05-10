import React from "react";
import "./EventImage.scss";

const EventImage = ({ image, imageFile }) => {
  const [imageUrl, setImageUrl] = React.useState();

  React.useEffect(() => {
    if (!imageFile) return;

    fetch(imageFile)
      .then((loadedBase64) => loadedBase64.blob())
      .then((blob) => {
        setImageUrl(URL.createObjectURL(blob));
      });
  }, [imageFile]);

  if (!imageFile) return null;

  return imageUrl ? (
    <img
      src={imageUrl}
      alt={image}
      width="96"
      height="96"
      className="event-image"
    />
  ) : (
    <span className="button is-loading">Loading</span>
  );
};

export default EventImage;
