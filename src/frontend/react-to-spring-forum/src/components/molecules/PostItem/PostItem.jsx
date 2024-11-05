import s from "./style.module.css";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import ReactBar from "../ReactionBar/ReactionBar";

const PostItem = ({ post }) => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.avatar}>
          <div className={s.inner_avatar}>
            <img src={post.user.avatar} alt={post.user.name} />
          </div>
        </div>

        <div className={s.user_information}>
          <div className={s.inner_user_information}>
            <div className={s.name}>{post.user.name}</div>
            <div className={s.username}>{post.user.username}</div>
          </div>
        </div>
      </div>
      <div className={s.title}>{post.title}</div>
      <div className={s.content}>{post.content}</div>
      <div className={s.image_list}>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {post.imageList.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={post.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ReactBar reactions={post.reactions} />
    </div>
  );
};

export default PostItem;
