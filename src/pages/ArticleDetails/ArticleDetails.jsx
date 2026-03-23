import React from "react";
import { FaUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { useLoaderData, useParams } from "react-router";

const ArticleDetails = () => {
  const { id } = useParams();

  const allArticles = useLoaderData();

  const ArticleData = allArticles?.find((article) => article.id == id);

  const { image, title, author, date, details } = ArticleData;

  return (
    <div className="max-w-10/12 mx-auto my-20">
      <div>
        <div>
          <img className="h-auto w-full object-cover" src={image} alt="plant" />
          <h1 className="text-primary text-4xl py-3">{title}</h1>

          <div className="flex items-center gap-4">
            <div className="">
              <p className="flex items-center gap-2 text-secondary font-bold text-lg my-3">
                <SlCalender /> {date}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-secondary font-bold text-lg my-3">
                <FaUser /> {author}
              </p>
            </div>
          </div>

          <p className="text-[#716F6B] font-medium text-lg leading-8 mb-10 text-justify">
            {details}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
