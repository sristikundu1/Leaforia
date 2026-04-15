import React from "react";
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

const ArticleDetails = () => {
  const { id } = useParams();
  const allArticles = useLoaderData();
  const article = allArticles?.find((item) => item.id == id);

  if (!article) return <p className="text-center mt-20">Article not found</p>;

  const { image, title, author, date, details } = article;

  // Static related articles for the sidebar (Make dynamic later)
  const relatedArticles = allArticles?.slice(0, 3) || [];

  // reading time
  const words = details.split(" ").length;
  const readTime = Math.ceil(words / 200);

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
                <FaUser /> {author}
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
                    <img
                      src={comment.userImage}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
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
              <h3 className="text-2xl font-bold mb-4">Leave A Reply</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  className="p-4 bg-white border border-gray-200 rounded-lg focus:outline-primary"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="p-4 bg-white border border-gray-200 rounded-lg focus:outline-primary"
                />
                <textarea
                  placeholder="Comment"
                  className="p-4 bg-white border border-gray-200 rounded-lg focus:outline-primary md:col-span-2 h-40"
                ></textarea>
                <button className="bg-primary text-white px-10 py-4 rounded-lg font-bold hover:bg-secondary transition-all w-fit uppercase tracking-wider text-sm">
                  Post Comment
                </button>
              </div>
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
                  src="https://i.ibb.co/4pDNDk1/avatar.png"
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <p className="font-bold text-primary">{author}</p>
                  <p className="text-sm text-gray-500">Plant Specialist</p>
                </div>
              </div>
            </div>

            {/* RELATED ARTICLES WIDGET */}
            <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
              <h4 className="font-bold text-gray-800 border-b pb-3 mb-6 uppercase text-sm tracking-widest">
                Related Articles
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
                      to={`/articles/${item.id}`}
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
                {[
                  "Gardening",
                  "Interior",
                  "Plant Care",
                  "Outdoor",
                  "Modern",
                ].map((tag) => (
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
