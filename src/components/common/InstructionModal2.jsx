import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const InstructionModal2 = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-lg bg-[#000e8e] px-3 sm:py-2 rounded-xl mt-4 text-white font-bold">
        Más información sobre Categoría
      </DialogTrigger>
      <DialogContent className="border-[5px] border-primary">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4 font-bold">
      Elegir Categorías
          </DialogTitle>
          <DialogDescription className="text-black">
            <p className="mb-5 text-lg font-semibold">
       Seleccione una o más categorías que se apliquen a su evento.
            </p>
            <p className="mb-4 text-lg font-semibold">
             *Música en vivo: Banda, DJ, cantante, karaoke, orquesta, sinfónica, musical, ópera, etc.
            </p>
     
            <p className="mb-10 text-lg font-semibold">
 Ej. Festival con música en vivo, vendedores de arte y comida. Las categorías podrán seleccionar: música en vivo, arte y cultura, comida y bebida, y variedad/otros. El evento aparecerá en cada categoría.
            </p>
            <p className="text-lg font-semibold">
      Variedad/Otro: Esta categoría es para eventos que tienen una variedad de ofertas o que no coinciden directamente con ninguna de las categorías proporcionadas. Ej.: Eventos Comunitarios, Feria del Libro, Ferias,
Fondas, Festivales, Desfiles, etc.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionModal2;
