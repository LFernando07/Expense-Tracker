import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CreatedExpenseForm } from "../form/CreatedExpenseForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// eslint-disable-next-line react/prop-types
export const ExpenseDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white p-6 overflow-y-auto">
          <button onClick={onClose} className="mt-4 text-red-500">
            Cerrar
          </button>
          <CreatedExpenseForm />
        </div>
      </Dialog>
    </Transition>
  );
};
