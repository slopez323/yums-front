import img1 from "../mockData/samplePhotos/IMG_0068.jpg";
import img2 from "../mockData/samplePhotos/IMG_0057.jpeg";
import img3 from "../mockData/samplePhotos/IMG_0058.jpeg";
import img4 from "../mockData/samplePhotos/IMG_0060.jpeg";

const users = [
  {
    id: 1,
    username: "user1",
    email: "user@test.com",
    password: "pass",
    restaurantList: [
      {
        name: "restaurant1",
        albumId: 1,
        coverPhoto:
          "https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg?w=2000",
        rating: 5,
        location: "",
        date: "9/18/2022",
        dishList: [
          {
            dishName: "dish1",
            dishImage: "",
            dishRating: 5,
            dishId: "a1",
          },
          {
            dishName: "dish2",
            dishImage: "",
            dishRating: 4,
            dishId: "a2",
          },
        ],
        otherImages: [],
        notes: "",
      },
      {
        name: "restaurant2",
        albumId: 2,
        coverPhoto:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
        rating: 3,
        location: "NYC",
        date: "9/20/2022",
        dishList: [
          {
            dishName: "dish1",
            dishImage: "",
            dishRating: 3,
            dishId: "b1",
          },
          {
            dishName: "dish2",
            dishImage: "",
            dishRating: 4,
            dishId: "b2",
          },
        ],
        otherImages: [],
        notes: "",
      },
      {
        name: "The Chemistry Room",
        albumId: 3,
        coverPhoto: img1,
        rating: 4,
        location: "NYC",
        date: "9/21/2022",
        dishList: [
          {
            dishName: "Smoked Miso Soup",
            dishImage: img2,
            dishRating: 4,
            dishId: "c1",
          },
          {
            dishName: "Kumamoto Oyster",
            dishImage: img3,
            dishRating: 5,
            dishId: "c2",
          },
          {
            dishName: "King Salmon",
            dishImage: img4,
            dishRating: 5,
            dishId: "c3",
          },
        ],
        otherImages: [],
        notes: "So good!! \n hello",
      },
    ],
  },
];

export default users;
