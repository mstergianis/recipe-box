"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogProps,
  DialogTitle,
} from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  item: string;
  id: number;
};

const DELETE_RECIPE = gql(`
mutation DeleteRecpie($id: Int!) {
  deleteRecipe(id: $id)
}
`);

export const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>
        <TrashIcon className="hover:cursor-pointer hover:fill-slate-600 transition-colors size-6 fill-gray-400" />
      </div>
      <DeleteModal open={open} setOpen={setOpen} {...props} />
    </>
  );
};

type DeleteModalProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
} & DeleteButtonProps &
  Pick<DialogProps, "open">;

const DeleteModal: React.FC<DeleteModalProps> = ({
  id,
  item,
  open,
  setOpen,
}) => {
  const router = useRouter();
  const [deleteRecipe] = useMutation(DELETE_RECIPE);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white p-4">
              <DialogTitle
                as="h3"
                className="text-base font-semibold text-gray-900"
              >
                Delete {item}
              </DialogTitle>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  deleteRecipe({ variables: { id } });
                  setOpen(false);
                  router.refresh();
                }}
                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset bg-red-600 text-white hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
