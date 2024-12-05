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
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "./Icons";

const Schema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().min(1, "description is required"),
  privatePlaylist: z.boolean().default(false).optional(),
});
const CreateNewPlaylistForm = () => {
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
        toast({
          title: "Playlist is created",
          variant: "default",
        });
        window.location.reload();
        isLoading(false);
      } else {
        toast({
          title: res.error,
          variant: "destructive",
        });
        isLoading(false);
      }
      isLoading(false);
    } catch (error) {
      isLoading(false);

      toast({
        title: "Error",
        variant: "destructive",
      });
    }
  };

  return (
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
                      className="max-w-lg flex-1 rounded-md border border-gray-800 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-300"
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
                    <Input
                      placeholder="Description"
                      {...field}
                      className="max-w-lg flex-1 rounded-md border border-gray-800 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-300"
                    />
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
                    <FormLabel>I want this playlist to be Private</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full flex">
              {loading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewPlaylistForm;
