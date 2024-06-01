// ForgotPassword.tsx
"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Search } from "lucide-react";
type FormValues = {
  search: string;
};

interface Movie {
  Title: string;
  // include other properties as needed
}

//first i will store the created token in the database for that email then i will check it here if it matches with the token in the database then only i  will show the form to submit the passwords and change them otherwiise not okkay

const Schema = z.object({
  search: z.string().min(1, " is required"),
});

interface Movie {
  Title: string;
  // include other properties as needed
}
const SearchBar = () => {
  const form = useForm<FormValues>();

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const verify = async () => {
      const res = await axios.get(
        `http://www.omdbapi.com/?s=${search}&apikey=69f8465b`
      );
      setMovies(res.data.Search);
      console.log(res.data);
    };

    verify();
  }, [search]);

  const onSubmit = async (values: z.infer<typeof Schema>) => {
    console.log("values of forgot password", values);
    movies.map((movie: Movie) => {
      console.log(movie.Title);
    });
    try {
      // const response = await axios.post("/api/reset-password", {
      //   ...data,
      //   token,
      //   email,
      // });
      // router.push("/sign-in");
      toast({
        title: "Password Upsated",
        description:
          "Password has been updated successfully, you can now login",
        variant: "default",
      });
      // console.log(response);
      // Handle success (e.g., show a success message and redirect to login page)
    } catch (error) {
      console.log(error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Search"
                    {...field}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      console.log(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full mt-6" type="submit">
          Submit{" "}
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
