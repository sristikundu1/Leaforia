import React, { use } from "react";
import { Link } from "react-router";

const articlesPromises = fetch("/articles.json").then((res) => res.json());
const Articles = () => {
  const articles = use(articlesPromises);
  return (
    <div className="max-w-10/12 mx-auto my-20 mb-36">
      <div className="text-center">
        <p className="font-medium text-lg text-secondary ">Eco Decor Ideas</p>
        <h2 className="font-bold text-3xl text-primary  mb-14">
          Inspiring ways to style your space with greenery
        </h2>
      </div>

      {/* Main Grid: 2 Columns (1 for big card, 1 for small cards stack) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE: Large Feature Card */}
        <div className="bg-[#f7f3ed] overflow-hidden rounded-sm shadow-sm flex flex-col">
          <div className="relative overflow-hidden">
            <img
              src={articles[0].image}
              alt="featured"
              className="
      h-[800px] w-full object-cover
      transition duration-500
      hover:scale-110
    "
            />
          </div>
          <div className="p-8">
            <p className="text-gray-500 text-lg mb-2">
              By {articles[0].author} | {articles[0].date}
            </p>
            <h3 className="text-2xl font-bold text-primary mb-6 hover:text-secondary">
              {articles[0].title}
            </h3>
            <Link to={`/article/${articles[0].id}`}>
              <button className="btn text-white btn-primary px-10 py-3 hover:bg-opacity-90 transition">
                Read More
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Vertical Stack of Horizontal Cards */}
        <div className="flex flex-col gap-6">
          {articles.slice(1, 4).map((article, index) => (
            <div
              key={index}
              className="flex bg-[#f7f3ed] overflow-hidden rounded-sm shadow-sm h-full max-h-auto"
            >
              {/* Square Image on the left */}
              <img
                src={article.image}
                alt="article"
                className="w-1/2 object-cover  transition duration-500
      hover:scale-110"
              />
              {/* Content on the right */}
              <div className="w-1/2 p-6 flex flex-col justify-center">
                <p className="text-gray-500 text-lg mb-2">
                  By {article.author} | {article.date}
                </p>
                <h3 className="text-2xl font-bold text-primary mb-4 leading-tight hover:text-secondary">
                  {article.title}
                </h3>
                <Link to={`/article/${article.id}`}>
                  <button className="btn btn-primary md:px-10 text-white  py-2 text-sm self-start">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
