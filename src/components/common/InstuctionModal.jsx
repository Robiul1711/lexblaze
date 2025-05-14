import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const InstuctionModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-lg bg-[#000e8e] px-3 sm:py-2 rounded-xl mt-4 text-white font-bold">
        Más Información
      </DialogTrigger>
      <DialogContent className="border-[5px] border-primary">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4 font-bold">
            Selección de Fechas
          </DialogTitle>
          <DialogDescription className="text-black">
            <p className="mb-5 text-lg font-semibold">
              La fecha de inicio será el primer día de tu evento. La fecha de
              finalización será el último día de tu evento.
            </p>
            <p className="mb-4 text-lg font-semibold">
              Si tu evento es de solo un día, tu fecha de inicio y finalización
              serán las mismas.
            </p>
            <h1 className="text-2xl font-bold text-black">
              **Selecciona un día solo para eventos recurrentes**
            </h1>
            <p className="mb-10 text-lg font-semibold">
              Esta sección es SOLO para eventos recurrentes. Solo está
              habilitada para rangos de fechas seleccionadas de 8 o más días.
            </p>
            <p className="text-lg font-semibold">
              Ej. Quiere publicar un evento que se repetirá todos los martes.
              Ingrese el primer martes como fecha de inicio y el último martes
              como fecha de finalización. Marque la casilla del martes. Su
              evento se publicará todos los martes entre las fechas
              seleccionadas
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InstuctionModal;
