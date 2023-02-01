import { createClient } from "next-sanity";

const client = createClient({
  projectId: "64ggg2og",
  dataset: "production",
  apiVersion: "2023-01-30",
  useCdn: true,
});

export default client;
