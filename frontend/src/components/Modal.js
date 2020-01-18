const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "block" : "hidden";
  const modalStyles =
    "fixed w-full h-full top-0 left-0 bg-dull " + showHideClassName;

  return (
    <div className={modalStyles}>
      <section className="modal-main w-3/5 bg-white fixed p-16">
        {children}
        <button
          className="bg-purple-700 text-white mt-6 rounded h-16 px-8 w-full"
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
