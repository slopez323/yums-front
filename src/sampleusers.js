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
          },
          {
            dishName: "dish2",
            dishImage: "",
            dishRating: 4,
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
          },
          {
            dishName: "dish2",
            dishImage: "",
            dishRating: 4,
          },
        ],
        otherImages: [],
        notes: "",
      },
    ],
  },
];

export default users;
