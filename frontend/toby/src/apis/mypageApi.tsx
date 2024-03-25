import { api } from "../config/apiConfig.tsx";

// URI : /member/clear-image
// 클리어사진 목록 열람
// response :
// {
//   “status” : 200,
//   “message” : “사진 목록을 보냈습니다”,
//    “result” :
//     {
//       “list” :
//           [
//               {
//                  “clearImageId” : 1,
//                   “clearImageUrl” : ”s3 url”,
//                   “placeId” : 1,
//                   “createdTime” : “234234T3424”
//               } ,
//               {
//                   “clearImageId” : 3,
//                   “clearImageUrl” : ”s3 url”,
//                   “placeId” : 2,
//                   “createdTime” : “234234T3424”
//               }
//           ]
//      }
// }
// Header :
//{
//   “Content-Type”: “application/json”
// }

export const getClearImageList = async () => {
  try {
    const response = await api.get("member/clear-image");
    return response.data.result.list;
  } catch (error) {
    console.error(error);
  }
};

export const getCarrotList = async () => {
  try {
    const response = await api.get("member/carrot");
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};
