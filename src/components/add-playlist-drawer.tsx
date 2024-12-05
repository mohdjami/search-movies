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
import { useForm } from "react-hook-form";
import { CreatePlaylist } from "@/lib/api";
import * as z from "zod";
import { ArrowBigRight, Plus } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Movie } from "@/types/config";
import SelectPlaylist from "./select-playlist";
import CreatePlaylistForm from "./create-playlist";
type AddPlaylistDrawerProps = {
  movie: Movie;
};
const Schema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().min(1, "description is required"),
  privatePlaylist: z.boolean().default(false).optional(),
});
const AddPlaylistDrawer: React.FC<AddPlaylistDrawerProps> = ({ movie }) => {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "New Playlist",
      description: "New Playlist Description",
      privatePlaylist: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    const { name, description, privatePlaylist } = data;
    const playlist = await CreatePlaylist(
      name,
      description,
      privatePlaylist,
      movie
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Playlist</DialogTitle>
          <DialogDescription className="py-2">
            Add to existing Playlist
          </DialogDescription>
          <SelectPlaylist movie={movie} />
        </DialogHeader>
        <hr />
        <CreatePlaylistForm movie={movie} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPlaylistDrawer;
