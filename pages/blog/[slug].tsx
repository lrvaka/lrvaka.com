import BlogPost from "../../components/BlogPost";
import client from "../../helpers/sanity";
import { parseISO, format } from "date-fns";

interface BlogPostPageProps {
  slug: string;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }: any) => (
  <BlogPost post={post} />
);

export const getStaticPaths = async () => {
  const posts = await client.fetch(`*[_type == "blogPost"]`);
  const paths = posts.map((post: any) => ({
    params: { slug: post.slug.current },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const post = await client.fetch(
    `
  *[_type == "blogPost" && slug.current == $slug][0]
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      post: post,
    },
  };
};
export default BlogPostPage;
