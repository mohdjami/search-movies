"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Movie } from "@/types/config";
type SelectPlaylistProps = {
  movie: Movie;
};
type Playlist = {
  _id: string;
  name: string;
};
const FormSchema = z.object({
  playlist: z.string({
    required_error: "Please select an playlist to display.",
  }),
});

const SelectPlaylist: React.FC<SelectPlaylistProps> = ({ movie }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await fetch("/api/playlists/get-all", {
        method: "GET",
      });
      const data = await res.json();
      setPlaylists(data.playlists);
      // console.log(data.playlists);
    };
    fetchPlaylists();
  }, []);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch("api/playlists/add-movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie,
        playlist: data.playlist,
      }),
    });
    console.log(res);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="playlist"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a playlist" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {playlists.map((playlist: Playlist) => {
                    return (
                      <SelectItem key={playlist._id} value={playlist.name}>
                        {playlist.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {/* <FormDescription>
                You can manage playlisy in your{" "}
                <Link href="/examples/forms">dashboard settings</Link>.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SelectPlaylist;
