import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AlertDialog({
  isOpen,
  message,
  onClose,
  primaryButtonText = "OK",
  secondaryButtonText = "Cancel",
  primaryButtonAction,
  showSecondaryButton = true,
  redirectPath = null,
}) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const handlePrimaryAction = () => {
    if (redirectPath) {
      navigate(redirectPath);
    }
    if (primaryButtonAction) {
      primaryButtonAction();
    }
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-pale-blue bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 pb-2 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:justify-center">
                    <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h2"
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
                        {message}
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:justify-center sm:gap-4 sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-coral-red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    onClick={handlePrimaryAction}
                  >
                    {primaryButtonText}
                  </button>
                  {showSecondaryButton && (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={onClose}
                      ref={cancelButtonRef}
                    >
                      {secondaryButtonText}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
