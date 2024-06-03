// ForgotPassword.tsx
"use client";
import { useForm } from "react-hook-form";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { ArrowBigRight, Plus } from "lucide-react";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";
import Image from "next/image";

import { Movie } from "@/types/config";
import AddPlaylistDrawer from "../add-playlist-drawer";

type FormValues = {
  search: string;
};
const Schema = z.object({
  search: z.string().min(1, "Search is required"),
});
const SearchForm = () => {
  // const [email, setEmail] = useState("");
  const form = useForm<FormValues>();
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(1);
  const totalPages = 10;
  useEffect(() => {
    const verify = async () => {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${search}&apikey=69f8465b&page=${currentPage}`
      );
      console.log(res);
      setMovies(res.data.Search);
      setTotalMovies(res.data.totalResults);
    };

    verify();
  }, [search, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Here you would also fetch the data for the new page
  };
  const paginationItems = [];
  for (let i = currentPage; i <= totalPages + currentPage; i++) {
    paginationItems.push(
      <PaginationItem key={i}>
        <PaginationLink
          href="#"
          onClick={() => handlePageChange(i.valueOf())}
          isActive={i === currentPage}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }
  const onSubmit = async (values: z.infer<typeof Schema>) => {
    console.log("values of search", values);
    //Add Pagination also
    setSubmit(true);
    console.log(submit);
    try {
      movies.map((movie: Movie) => {
        // console.log(movie.Title);
      });
      toast({
        title: "Success",
        description: "Form Submitted",
        variant: "default",
      });
    } catch (error) {}
  };

  return (
    <main>
      <section className="flex justify-center items-center m-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5 items-center"
          >
            <div className="flex space-x-2 justify-center">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Search"
                        {...field}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          form.setValue("search", e.target.value);
                        }}
                        className="w-[600px] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="default">
                <ArrowBigRight />
              </Button>
            </div>
          </form>
        </Form>
      </section>{" "}
      <section className="container m-10">
        {movies && !submit ? (
          <div className="grid lg:grid-cols-6">
            {movies.map((movie: Movie) => (
              <Card className="p-4 m-2" key={movie.imdbID}>
                <CardTitle
                  key={movie.imdbID}
                  className="flex text-lg py-3 truncate items-center justify-between"
                  title={movie.Title}
                >
                  {movie.Title}
                </CardTitle>
                <CardDescription>{movie.Title}</CardDescription>
                <CardDescription className="flex items-center justify-center p-4">
                  {movie.Poster !== "N/A" ? (
                    <Image
                      src={movie.Poster}
                      alt={movie.Title}
                      width={50}
                      height={50}
                    />
                  ) : null}
                </CardDescription>
              </Card>
            ))}
          </div>
        ) : null}
        {submit ? (
          <div className="grid grid-cols-4 gap-5 m-10">
            {movies.map((movie: Movie) => (
              <Card className="grid p-5 space-y-5" key={movie.imdbID}>
                <CardTitle
                  key={movie.imdbID}
                  className="flex text-lg py-3 truncate items-center justify-between"
                  title={movie.Title}
                >
                  {movie.Title}{" "}
                </CardTitle>
                <CardDescription className="py-2">{movie.Year}</CardDescription>
                <CardDescription className="flex items-center justify-center p-4">
                  {movie.Poster !== "N/A" ? (
                    <Image
                      src={movie.Poster}
                      alt={movie.Title}
                      width={200}
                      height={200}
                    />
                  ) : null}
                </CardDescription>
                <CardFooter className="flex justify-between">
                  {movie.Type} <AddPlaylistDrawer movie={movie} />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : null}
        {submit ? (
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>
                {paginationItems}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default SearchForm;
