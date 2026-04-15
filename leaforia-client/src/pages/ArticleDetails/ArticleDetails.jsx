import React, { use, useEffect, useState } from "react";
import {
  FaUser,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRss,
} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { useLoaderData, useParams, Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [related, setRelated] = useState([]);

  useEffect(() => {
    axiosSecure.get("/articles").then((res) => {
      setRelated(res.data);
    });
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axiosSecure.get(`/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const Comment = {
      userName: user.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      text: commentText,
      date: new Date(),
    };

    try {
      await axiosSecure.patch(`/articles/${article._id}/comment`, Comment);
      toast.success("Thanks! Your comment has been posted.");

      // update UI instantly
      article.comments.unshift(Comment);

      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  const relatedArticles = related?.slice(0, 3) || [];

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!article) return <p className="text-center mt-20">Article not found</p>;

  const { image, title, author, date, details, tags } = article;

  const readTime = Math.ceil(details?.split(" ").length / 200);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 1. TOP TITLE - FULL WIDTH */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary leading-tight mb-4">
            {title}
          </h1>
          <div className="flex justify-center items-center gap-4 text-gray-500 uppercase tracking-widest text-xs font-semibold">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <span>•</span>
            <span className="text-primary">Blog Details</span>
          </div>
        </motion.div>

        {/* 2. TWO COLUMN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDE: ARTICLE CONTENT */}
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-sm mb-8">
              <img
                src={image}
                alt={title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex gap-6 text-gray-400 text-sm mb-8 italic">
              <span className="flex items-center gap-2">
                <SlCalender /> {date}
              </span>
              <span className="flex items-center gap-2">
                <FaUser /> {author.name}
              </span>
              <p>⏱ {readTime} min read</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-16">
              <p className="whitespace-pre-line">{details}</p>
            </div>

            {/* Comment Section Placeholder */}
            <div className="border-t pt-12">
              <div className="space-y-6">
                {article.comments?.slice(0, 2).map((comment, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <div>
                      <h4 className="font-bold text-sm">{comment.userName}</h4>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))}

                {article.comments?.length > 2 && (
                  <p className="text-xs text-primary font-bold cursor-pointer">
                    View all comments...
                  </p>
                )}
              </div>
              <h3 className="text-2xl font-bold my-4">Leave A Reply</h3>
              <form onSubmit={handleCommentSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    defaultValue={user?.displayName || ""}
                    placeholder="Name *"
                    className="p-4 bg-white border border-gray-200 rounded-lg focus:outline-primary"
                  />
                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    placeholder="Email *"
                    className="p-4 bg-white border border-gray-200 rounded-lg focus:outline-primary"
                  />
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Comment"
                    className="p-4 bg-white border border-gray-200 rounded-lg focus:outline-primary md:col-span-2 h-40"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-primary text-white px-10 py-4 rounded-lg font-bold hover:bg-secondary transition-all w-fit uppercase tracking-wider text-sm"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* RIGHT SIDE: SIDEBAR */}
          <aside className="lg:w-1/3 space-y-10">
            {/* AUTHOR CARD */}
            <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm ">
              <h4 className="font-bold text-gray-800 border-b pb-3 mb-6 uppercase text-sm tracking-widest">
                Author
              </h4>
              <div className="flex items-center gap-4">
                <img
                  src={article?.author?.image}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-primary">{author.name}</p>
                  <p className="text-sm text-gray-500">{author?.speciality}</p>
                </div>
              </div>
            </div>

            {/* MORE ARTICLES WIDGET */}
            <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
              <h4 className="font-bold text-gray-800 border-b pb-3 mb-6 uppercase text-sm tracking-widest">
                More Articles
              </h4>
              <div className="space-y-6">
                {relatedArticles.map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="overflow-hidden rounded-lg mb-3">
                      <img
                        src={item.image}
                        className="w-full h-32 object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <h5 className="font-bold text-gray-800 line-clamp-1 mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                      Learn more about how to keep your greenery thriving...
                    </p>
                    <Link
                      to={`/article/${item._id}`}
                      className="text-xs font-bold text-primary uppercase border-b border-primary pb-0.5 hover:text-secondary hover:border-secondary transition"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* TAGS WIDGET */}
            <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
              <h4 className="font-bold text-gray-800 border-b pb-3 mb-6 uppercase text-sm tracking-widest">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-100 hover:bg-primary hover:text-white transition cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* FOLLOW US */}
            <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
              <h4 className="font-bold text-gray-800 border-b pb-3 mb-6 uppercase text-sm tracking-widest">
                Follow Us
              </h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition cursor-pointer">
                  <FaFacebookF />
                </div>
                <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition cursor-pointer">
                  <FaTwitter />
                </div>
                <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition cursor-pointer">
                  <FaLinkedinIn />
                </div>
                <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition cursor-pointer">
                  <FaRss />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
