import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

const Guide = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Guide</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Guide</DialogTitle>
          <DialogDescription className="py-2">
            First and foremost You need to signin before searching and start
            creating Playlists. After successfully logging in you will see
            search and dashboard route use them to search movies and create
            playlists.
          </DialogDescription>
          <DialogDescription className="py-2 ">
            While typing on the search bar you will see related suggestions on
            the movies. Write proper name and click on the side button to view
            proper cards of the images. Click on the + icon to add to the
            playlist.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Guide;
