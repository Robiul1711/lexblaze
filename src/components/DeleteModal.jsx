import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button"; // Assuming the Button component is used consistently

const DeleteModal = ({ open, onOpenChange, onConfirm, isLoading }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <Dialog.Content className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-xl font-bold">¿Estás seguro?</h2>
            <p>Esta acción eliminará el evento permanentemente.</p>
            <div className="flex justify-center gap-4 mt-6">
              {/* Cancel Button */}
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>

              {/* Delete Button with Loading State */}
              <Button
                variant="destructive" // Use a destructive variant if using Button component for styling
                onClick={onConfirm}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Eliminando...
                  </>
                ) : (
                  "Eliminar"
                )}
              </Button>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteModal;
