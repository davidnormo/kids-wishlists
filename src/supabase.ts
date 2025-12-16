import { Database } from "./database.types";
import { createClient } from "@supabase/supabase-js";
import groupBy from "lodash/groupBy";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  return { error, user: data.user };
};

export const isLoggedIn = async () => {
  const { error } = await getUser();
  return !error;
};

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    error,
    data,
  };
};

export const authConfirm = async (token: string) => {
  const { error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: "email",
  });

  return error;
};

export type Product = Awaited<
  ReturnType<typeof getOwnedProducts>
>["groupedByFor"][string][0];

export const getOwnedProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("id,for,name,price,url,buyer:users!buyer(name),owner");

  const groupedByFor = groupBy(data, "for");

  return { error, groupedByFor };
};

type AddProduct = Product & { buyer: null; owner: string };

export const addProduct = async (product: AddProduct) => {
  await supabase.from("products").insert(product);
};
