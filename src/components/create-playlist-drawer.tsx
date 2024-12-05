"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import CreateNewPlaylistForm from "./create-new-playlist-form";

const Schema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().min(1, "description is required"),
  privatePlaylist: z.boolean().default(false).optional(),
});
const CreatePlaylistNewDrawer = () => {
  const [loading, isLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "New Playlist",
      description: "New Playlist Description",
      privatePlaylist: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      isLoading(true);
      const { name, description, privatePlaylist } = data;

      const response = await fetch("api/playlists/create-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          privatePlaylist,
        }),
      });
      const res = await response.json();
      if (response.ok) {
        window.location.reload();
        isLoading(false);
      } else {
        toast({
          title: res.message,
          variant: "destructive",
        });
        isLoading(false);
      }
      isLoading(false);
    } catch (error) {
      isLoading(false);

      console.log(error);
      toast({
        title: "Error",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Playlist</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Playlist</DialogTitle>
        </DialogHeader>
        <hr />
        <CreateNewPlaylistForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlaylistNewDrawer;
