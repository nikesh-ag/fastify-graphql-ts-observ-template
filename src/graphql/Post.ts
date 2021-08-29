import { objectType, extendType } from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("title");
    t.string("body");
    t.boolean("published");
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("drafts", {
      type: Post,
      resolve(parent, args, context, info) {
        return [
          { id: "1", title: "Post 1", body: "Post Body 1", published: false },
        ];
      },
    });
  },
});
