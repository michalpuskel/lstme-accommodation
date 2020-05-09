import React, { useContext } from "react";
import Layout from "../../application/layout/layout/Layout";
import UserContext from "../../config/UserContext";
import useModal from "../../hooks/utils/useModal";
import Modal from "../../lib/modal/Modal";
import FormNewEvent from "./FormNewEvent";
import useFormNewEvent from "./useFormNewEvent";
import useSubmitEventAddhandler from "./useSubmitEventAddhandler";

const EventList = () => {
  const user = useContext(UserContext);

  const { input, handler, id } = useFormNewEvent();
  const newEventModal = useModal();
  const submitEventAddHandler = useSubmitEventAddhandler();

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
    </Layout>
  );
};

export default EventList;
