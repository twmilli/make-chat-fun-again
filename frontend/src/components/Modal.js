const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "block" : "hidden";
  const modalStyles = "fixed w-full h-full top-0 left-0 " + showHideClassName;

  return (
    <div className={modalStyles}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default Modal;
