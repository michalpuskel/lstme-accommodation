import React from "react";
import "./EventList.scss";

const EventRow = ({ title, description, image, imageFile }) => {
  return (
    <div className="box">
      <div className="flex justify-between">
        <div className="pr-8">
          <h3 className="title">{title}</h3>
          {description && <p>{description}</p>}
        </div>
        <Image image={image} imageFile={imageFile} />
      </div>
    </div>
  );
};

const Image = ({ image, imageFile }) => {
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
      className="event-list__image"
    />
  ) : (
    <span className="button is-loading">Loading</span>
  );
};

export default EventRow;
