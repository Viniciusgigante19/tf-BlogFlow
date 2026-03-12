import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Post = sequelize.define('Post', {
  id:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title:   { type: DataTypes.STRING(255), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  tags:    { type: DataTypes.STRING(255), allowNull: true },
}, {
  tableName:  'posts',
  timestamps: true,
  createdAt:  'created_at',
  updatedAt:  'updated_at',
});

await sequelize.sync();

// GET /api/posts
export async function getAllPosts() {
  return await Post.findAll({ order: [['created_at', 'DESC']] });
}

// GET /api/posts/:id
export async function getPostById(id) {
  return await Post.findByPk(id);
}

// POST /api/posts
export async function createPost({ title, content, tags }) {
  return await Post.create({ title, content, tags });
}

// PUT /api/posts/:id
export async function updatePost(id, { title, content, tags }) {
  const post = await Post.findByPk(id);
  if (!post) return null;
  return await post.update({ title, content, tags });
}

// DELETE /api/posts/:id
export async function deletePost(id) {
  const post = await Post.findByPk(id);
  if (!post) return null;
  await post.destroy();
  return true;
}

export default Post;