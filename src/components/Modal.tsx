import React from "react";

type Props = {
  children: React.ReactNode;
  cancelButtonPosition?: "topRight" | "bottomRight";
};

const Modal = React.forwardRef<HTMLDialogElement, Props>(function Modal(
  { children, cancelButtonPosition = "bottomRight" },
  ref
) {
  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {cancelButtonPosition === "topRight" && (
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        )}
        {children}
        {cancelButtonPosition === "bottomRight" && (
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        )}
      </div>
    </dialog>
  );
});

export default Modal;
