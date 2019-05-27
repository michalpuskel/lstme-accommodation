import React from "react";

//TODO refactor
const FormNewRoom = props => {
  const { input, handler } = props;

  return (
    <>
      <label>
        meno:
        <input
          type="text"
          value={input.name}
          onChange={handler.changeName}
          placeholder="Meno izby"
          required
        />
      </label>
      <label>
        počet postelí:
        <input
          type="number"
          value={input.bedCount}
          onChange={handler.changeBedCount}
          min={0}
          max={20}
          required
        />
      </label>
      <label>
        izba len pre vedúcich:
        <input
          type="checkbox"
          value={input.isSupervisorOnly}
          onChange={handler.changeIsSupervisorOnly}
        />
      </label>
      <label>
        popis:
        <textarea
          value={input.description}
          onChange={handler.changeDescription}
          placeholder="Bližší popis izby"
          rows={4}
        />
      </label>
    </>
  );
};

export default FormNewRoom;
