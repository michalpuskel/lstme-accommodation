import React from "react";

const FormNewEvent = (props) => {
  const { input, handler, id } = props;

  return (
    <>
      <div className="field">
        <label className="label" htmlFor={id.title}>
          Názov
        </label>
        <div className="control has-icons-left">
          <input
            className="input"
            id={id.title}
            type="text"
            value={input.title}
            onChange={handler.changeTitle}
            placeholder="Názov organizácie"
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-users" />
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
            placeholder="Bližší popis organizácie"
            rows={4}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor={id.url}>
          URL linka
        </label>
        <div className="control has-icons-left">
          <input
            className="input"
            id={id.url}
            type="text"
            value={input.url}
            onChange={handler.changeUrl}
            placeholder="https://www.moja_organizacia.org/"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-link" />
          </span>
        </div>
      </div>
      <div>TODO image</div>
    </>
  );
};

export default FormNewEvent;
