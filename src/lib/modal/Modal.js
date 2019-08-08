import React from "react";
import "./Modal.scss";

const Modal = props => {
  const submitHandler = async event => {
    event.persist();
    event.preventDefault();

    if (!props.button.action.check()) {
      console.log("TODO CHEEECK");
      return;
    }

    try {
      await props.onSubmit(event);
      props.button.dismiss.handler(event);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`modal ${props.active ? "is-active" : ""}`}>
      <div
        className="modal-background"
        onClick={props.button.dismiss.handler}
      />

      <div className="modal-card">
        <form onSubmit={submitHandler}>
          <header className="modal-card-head">
            <p className="modal-card-title">{props.title}</p>
            <button
              className="delete"
              aria-label="close"
              type="button"
              onClick={props.button.dismiss.handler}
            />
          </header>

          <section
            className={`modal-card-body modal__section--max-height ${
              props.bodySectionClass ? props.bodySectionClass : ""
            }`}
          >
            {props.children}
          </section>

          <footer className="modal-card-foot">
            <input
              className={`button ${props.button.action.class}`}
              type="submit"
              value={props.button.action.label}
            />

            <button
              className="button"
              type="button"
              onClick={props.button.dismiss.handler}
            >
              {props.button.dismiss.label}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Modal;
