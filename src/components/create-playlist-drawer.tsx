"use client";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowBigRight, Plus } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Movie } from "@/types/config";
import SelectPlaylist from "./select-playlist";
import { useRouter } from "next/navigation";

const Schema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().min(1, "description is required"),
  privatePlaylist: z.boolean().default(false).optional(),
});
const CreatePlaylistNew = () => {
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
    const { name, description, privatePlaylist } = data;
    console.log(name, description, privatePlaylist);

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
    if (response.ok) {
      window.location.reload();
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
          <DialogDescription className="py-2">
            Create New Playlist
          </DialogDescription>
        </DialogHeader>
        <hr />
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-5 items-start"
            >
              <div className="grid grid-rows-4 gap-4 py-4 space-y-2 justify-start w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Playlist Name"
                          {...field}
                          className="col-span-3 w-[340px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="privatePlaylist"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I want this playlist to be Private
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlaylistNew;
