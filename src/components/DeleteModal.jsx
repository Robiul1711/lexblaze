import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

const DeleteModal = ({ open, onOpenChange, onConfirm, isLoading }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <Dialog.Content className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-xl font-bold">¿Estás seguro?</h2>
            <p>Esta acción eliminará el evento permanentemente.</p>
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? "Eliminando..." : "Eliminar"}
              </Button>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteModal;
