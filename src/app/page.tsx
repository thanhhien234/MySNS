import { getPosts } from "@/actions/post.action";
import CreatePost from "@/components/CreatePost";
import { currentUser } from "@clerk/nextjs/server";
import PostCard from "@/components/PostCard";
import { getUserId } from "@/actions/user.action";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getUserId();

  console.log({posts});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}

        <div className="space-y-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} dbUserId = {dbUserId}/>
          ))}
        </div>
      </div>
    </div>
  );
}
