import React from "react";

import logo from "../../resources/img/logo.svg";

const EventRow = ({ title, description, image }) => {
  return (
    <div className="box">
      <div className="flex justify-between">
        <div className="pr-8">
          <h3 className="title">{title}</h3>
          {description && <p>{description}</p>}
        </div>
        <Image image={image} />
      </div>
    </div>
  );
};

const Image = ({ image }) => {
  const [imageUrl, setImageUrl] = React.useState();

  React.useEffect(() => {
    if (!image) return;

    fetch(image)
      .then((loadedBase64) => loadedBase64.blob())
      .then((blob) => {
        setImageUrl(URL.createObjectURL(blob));
        console.log({ blob });
      });
  }, [image]);

  if (!image) return null;

  return imageUrl ? (
    <img src={imageUrl} alt="LSTME" width="96" height="96" />
  ) : (
    <span className="button is-loading">Loading</span>
  );
};

export default EventRow;
