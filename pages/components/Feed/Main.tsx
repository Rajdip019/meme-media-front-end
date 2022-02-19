import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { useSession } from 'next-auth/react';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FileSaver, { saveAs } from 'file-saver'


type Props = {
  id: string,
  image: string,
  title: string,
  post_hint: string,
  author: string,
  reddit_page: string,
  ups: number
}

const Feed: React.FC<Props> = ({ id, image, title, post_hint, author, reddit_page, ups }) => {


  const session = useSession<boolean>();

  const downloadMeme = (url: string) => {
    saveAs('https://i.redd.it/x327os3t1oi81.jpg', 'meme.jpg')
    console.log(url);
     // Put your image url here.
  }

  const [hasLiked, setHasLiked] = useState<boolean>(false);

  return (
    <React.Fragment>
      {post_hint === "image" && (
        <React.Fragment>
          <div className="max-w-[600px] mx-auto bg-[#0d0d0d] rounded-xl mt-5 px-4 pt-2 pb-2 border-gray-500 border-[1px] border-opacity-30 w-11/12 text-gray-100">
            <div className="flex items-center py-2">
              <Avatar
                alt={author}
                src="none"
                sx={{ width: 48, height: 48, backgroundColor: "black" }}
                className=" ring-2 ring-white"
              />
              <div>
                <p className="ml-3">{author}</p>
                <p className="ml-3 text-xs text-gray-600">
                  {reddit_page}
                </p>
              </div>
            </div>
            <>
              <h3 className="my-2">{title}</h3>
              <img src={image} alt="" className="mx-auto rounded-lg" loading="lazy" />
            </>
            <div className="flex justify-between">
              <div className="text-sm py-2 font-bold text-gray-600"> {ups} People loved❤️ it in reddit</div>
            </div>
            <hr />



            <div className="flex justify-between mt-2 sm:w-11/12 mx-auto">
              {session.status === "authenticated" && (
                <div
                  className="items-center font-semibold p-2 cursor-pointer text-gray-100 hover:bg-gray-800 rounded-lg transition-all w-full flex justify-center" onClick={(): void => { setHasLiked(!hasLiked) }}
                >
                  <>
                    {hasLiked ? (
                      <>
                        <FavoriteIcon sx={{ marginRight: 1, height: 20 }} />
                        Favourite
                      </>
                    ) : (
                      <>
                        <FavoriteBorderIcon sx={{ marginRight: 1, height: 20 }} />
                        Favourite
                      </>
                    )}
                  </>
                </div>
              )}
              {session.status === "unauthenticated" && (null) }
              <div className=" items-center font-semibold p-2 cursor-pointer text-gray-100 hover:bg-gray-800 rounded-lg transition-all w-full flex justify-center">
                <ShareIcon sx={{ marginRight: 1, height: 20 }} />
                Share
              </div>
              <div className="sm:flex items-center font-semibold p-2 cursor-pointer text-gray-100 hover:bg-gray-800 rounded-lg transition-all w-full flex justify-center" onClick={(): void => {downloadMeme(image)}}>
                <DownloadIcon sx={{ height: 24, marginRight: 1 }} />
                Download
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Feed;
