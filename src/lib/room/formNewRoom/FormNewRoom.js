import React from "react";

import useFormNewRoom from "../../../hooks/room/useFormNewRoom";
import useSubmitRoomAddHandler from "../../../hooks/room/useSubmitRoomAddHandler";

const FormNewRoom = props => {
  const { input, handler } = useFormNewRoom();
  const submitRoomAddHandler = useSubmitRoomAddHandler(input, props.onRoomAdd);

  return (
    <form onSubmit={submitRoomAddHandler}>
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

      <input type="submit" value="Pridať izbu" />
    </form>
  );
};

export default FormNewRoom;
