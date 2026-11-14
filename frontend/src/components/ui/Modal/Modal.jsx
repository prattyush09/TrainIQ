import "./Modal.css";

function Modal({ children, close }) {
  return (
    <div className="modal-overlay-v2">

      <div className="modal-box-v2">

        <button
          className="modal-close-v2"
          onClick={close}
          aria-label="Close dialog"
        >
          ✕
        </button>

        {children}

      </div>

    </div>
  );
}

export default Modal;