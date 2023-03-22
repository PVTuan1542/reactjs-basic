export const Users = [
  {
    id:1,
    profilePicture: "https://thuthuatphanmem.vn/uploads/2018/04/10/hinh-nen-bong-hoa-dep-day-suc-song_052333603.jpg",
    username: "Sofia jackson",
    address: "Japan"
  },
  {
    id:2,
    profilePicture: "https://statics.vinpearl.com/canh-dep-viet-nam-15_1634999578.jpg",
    username: "Janell Shrum",
    address: "Korea"
  },
  {
    id:3,
    profilePicture: "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg",
    username: "Alex Durden",
    address: "US"
  },
  {
    id:4,
    profilePicture: "https://demoda.vn/wp-content/uploads/2022/02/background-dep-1.jpg",
    username: "Dora Hawks",
    address: "Viet Nam"
  },
  {
    id:5,
    profilePicture: "https://vapa.vn/wp-content/uploads/2022/12/anh-canh-dep-001-1.jpg",
    username: "Thomas Holden",
    address: "Malaysia"
  },
  {
    id:6,
    profilePicture: "https://znews-photo.zingcdn.me/w660/Uploaded/jaroin/2015_11_04/10.jpg",
    username: "Shirley Beauchamp",
    address: "China"
  },
  {
    id:7,
    profilePicture: "https://cdn3.ivivu.com/2014/12/chum-anh-tuyet-dep-ve-khung-canh-than-tien-cua-du-lich-nauy-iVIVU.com-1.jpg",
    username: "Travis Bennett",
    address: "UK"
  },
  {
    id:8,
    profilePicture: "https://znews-photo.zingcdn.me/w660/Uploaded/jaroin/2015_11_04/1.jpg",
    username: "Kristen Thomas",
    address: "Japan"
  },
  {
    id:9,
    profilePicture: "https://image.vtcnews.vn/resize/th/upload/2021/12/17/nui-han-quoc-47-14143240.jpg",
    username: "Gary Duty",
    address: "Japan"
  },
  {
    id:10,
    profilePicture: "http://media.bizwebmedia.net/Sites/76685/data/upload/2016/12/bo_anh_phong_canh_dep_nhu_chon_than_tien_tren_trai_dat__2.jpg?0",
    username: "Angela Kocaoglu",
    address: "Japan"
  },
];

const URL = `http://localhost:4000/api`

export const POST = {
  GET_ALL_POSTS: `${URL}/posts/all`,
  UPDATE_POST: `${URL}/posts/update`,
  DELETE_POST: `${URL}/posts/delete`,
  ADD_POST: `${URL}/posts/add`,
  GET_LOAD_MORE: `${URL}/posts/loadMore`
}

export const COMMENT = {
  GET_ALL: `${URL}/comments/all`,
  UPDATE: `${URL}/comments/update`,
  DELETE: `${URL}/comments/delete`,
  ADD: `${URL}/comments/add`,
  GET_BY_POST_ID: `${URL}/comments/postId`,
  GET_BY_PARENT_ID: `${URL}/comments/parentId`
}

export const userId = "dbf13612-240c-43b9-ab0f-b5bf3ffe2f08"

export const photoDefault = "https://cms.vietnamcoracle.com/wp-content/uploads/2018/08/20140922_103249-copy-blog-cropped-1-1024x752.jpg"