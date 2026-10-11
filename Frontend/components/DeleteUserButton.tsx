import { Button } from "./ui/button";
import { deleteUserAction, logOutAction } from "@/app/server-actions/users";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function DeleteUserButton() {
  const router = useRouter();
  const handleClick = async () => {
    //Create popup
    //Popup should have deleteUser action.
    let errorMessage = (await deleteUserAction()).errorMessage;
    if (!errorMessage) {
      await logOutAction();
      toast.success("Slettet bruker");
      router.push("/");
    } else {
      toast.error("Error: Bruker ble ikke slettet", {
        description: errorMessage,
      });
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="border-2 border-[oklch(50.614%_0.19528_27.939)]
    hover:bg-blue-200 text-[oklch(50.614%_0.19528_27.939)]"
          >
            Slett bruker
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Slett bruker?</DialogTitle>
            <DialogDescription>
              Er du sikker på at du vil slette brukeren din? Denne prosessen kan
              ikke reverseres.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleClick}
              variant="outline"
              className="border-2 border-[oklch(50.614%_0.19528_27.939)]
    hover:bg-blue-200 text-[oklch(50.614%_0.19528_27.939)]"
            >
              Slett bruker
            </Button>
            <DialogClose asChild>
              <Button>Avbryt</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default DeleteUserButton;
