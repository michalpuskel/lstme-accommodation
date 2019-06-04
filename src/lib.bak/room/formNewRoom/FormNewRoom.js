import React from "react";

//TODO refactor
const FormNewRoom = props => {
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
        <label className="label" htmlFor={id.bedCount}>
          Počet postelí
        </label>
        <div className="control has-icons-left">
          <input
            className="input"
            id={id.bedCount}
            type="number"
            value={input.bedCount}
            onChange={handler.changeBedCount}
            min={0}
            max={20}
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-bed" />
          </span>
        </div>
      </div>

      <div className="field">
        <input
          className="is-checkradio is-success"
          id={id.isSupervisorOnly}
          name={id.isSupervisorOnly}
          type="checkbox"
          value={input.isSupervisorOnly}
          onChange={handler.changeIsSupervisorOnly}
        />
        <label htmlFor={id.isSupervisorOnly}>Izba len pre vedúcich</label>
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

export default FormNewRoom;
