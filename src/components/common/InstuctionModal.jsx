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
          <DialogTitle className="text-2xl  font-bold">
            Selección de Fechas
          </DialogTitle>
          <DialogTitle className="text-xl mb-4 font-bold">
           Seleccione todas las fechas de su evento:
          </DialogTitle>
          <DialogDescription className="text-black">
            <p className=" mb-3 text-lg font-semibold">
           Puede elegir una sola fecha. 

            </p>
            <p className="mb-3 text-lg font-semibold">
            Un rango de 2 o más días consecutivos. 

            </p>
            
            <p className="mb-3 text-lg font-semibold">
              Cuatro o más días del mismo día (ej., 4 o más viernes, 4 o más lunes, etc.) si tiene un evento semanal recurrente. 

            </p>
            <p className="mb-3 text-lg font-semibold">
O varios días aleatorios (puede ser una combinación de las opciones anteriores). 

            </p>
            <p className="mb-3 text-lg font-semibold">
Consulte los tutoriales para obtener más información.

            </p>
          
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InstuctionModal;
