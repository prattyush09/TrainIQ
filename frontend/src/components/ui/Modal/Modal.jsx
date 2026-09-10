import "./Modal.css";

function Modal({children, close}) {
  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <button 
          className="modal-close"
          onClick={close}
        >
          ×
        </button>

        {children}

      </div>

    </div>
  );
}

export default Modal;
