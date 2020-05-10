import React, { useContext } from "react";
import Layout from "../../application/layout/layout/Layout";
import UserContext from "../../config/UserContext";
import useModal from "../../hooks/utils/useModal";
import Modal from "../../lib/modal/Modal";
import FormNewEvent from "./FormNewEvent";
import useFormNewEvent from "./useFormNewEvent";
import useSubmitEventAddhandler from "./useSubmitEventAddhandler";
import useEvents from "./useEvents";
import EventRow from "./EventRow";

const EventList = () => {
  const user = useContext(UserContext);
  const eventList = useEvents();
  const events = Object.keys(eventList);

  const { input, handler, id } = useFormNewEvent();
  const newEventModal = useModal();
  const submitEventAddHandler = useSubmitEventAddhandler(input);

  return (
    <Layout title="Zoznam organizácií">
      {user.is_super_admin && (
        <>
          <Modal
            title="Nová organizácia"
            button={{
              action: {
                label: "Vytvoriť organizáciu",
                check: () => input.title.trim().length > 0,
                class: "is-success",
              },
              dismiss: {
                label: "Zrušiť",
                handler: newEventModal.toggleModal,
              },
            }}
            onSubmit={submitEventAddHandler}
            active={newEventModal.showModal}
          >
            <FormNewEvent input={input} handler={handler} id={id} />
          </Modal>

          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <button
                  className="button is-success is-outlined"
                  onClick={newEventModal.toggleModal}
                >
                  Pridať organizáciu
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="columns is-multiline is-vcentered is-variable is-3">
        <div className="column">
          <div className="content">
            {events.length > 0 ? (
              events.map((eventId) => (
                <EventRow key={eventId} {...eventList[eventId]} />
              ))
            ) : (
              <div className="box">
                <p>
                  Nie sú vytvorené žiadne organizácie, požiadajte administrátora
                  o vytvorenie.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventList;
