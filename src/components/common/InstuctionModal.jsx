import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



const InstuctionModal = ({ open, }) => {
  return (
   <Dialog>
  <DialogTrigger className="text-lg bg-[#000e8e] px-3 sm:py-2 rounded-xl mt-4 text-white font-bold">Más Información</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  );
};

export default InstuctionModal;
