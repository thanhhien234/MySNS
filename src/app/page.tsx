import { getPosts } from "@/actions/post.action";
import CreatePost from "@/components/CreatePost";
import { currentUser } from "@clerk/nextjs/server";
import PostCard from "@/components/PostCard";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();

  console.log(posts);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))}
        </div>
      </div>
    </div>
  );
}
