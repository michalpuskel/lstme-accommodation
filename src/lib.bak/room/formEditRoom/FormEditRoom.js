import React from "react";

const FormEditRoom = props => {
  const { input, handler, id } = props;

  return (
    <>
      <div className="field">
        <label className="label" htmlFor={id.name}>
          Meno
        </label>
        <div className="control has-icons-left">
          <input
            className="input"
            id={id.name}
            type="text"
            value={input.name}
            onChange={handler.changeName}
            placeholder="Meno izby"
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-couch" />
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor={id.description}>
          Popis
        </label>
        <div className="control">
          <textarea
            className="textarea"
            id={id.description}
            value={input.description}
            onChange={handler.changeDescription}
            placeholder="Bližší popis izby"
            rows={4}
          />
        </div>
      </div>
    </>
  );
};

export default FormEditRoom;
