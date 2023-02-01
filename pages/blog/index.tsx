import client from "../../helpers/sanity";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
}

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  console.log({ posts });
  return (
    <div>
      {posts.map((e, i) => {
        return (
          <Link href={`/blog/${e.slug.current}`} key={e._id}>
            {e.title}
          </Link>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = (await client.fetch(`*[_type == "blogPost"]`)) as BlogPost[];

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
