const getStats = (data = []) => {
  //no.of messages,no.of.words,no.of.edited message, deleted message, average message length, unique words, character in longest message
  let result = {};
  let users = [];
  let len = data.length;
  let words = 0,
    edited = 0,
    deleted = 0,
    tot_Char = 0,
    longest = 0,
    long_message = "",
    unique = [],
    messages = len;
  //   result["messages"] = len;
  for (let i = 0; i < len; i++) {
    let username = data[i]["sender"]["username"];
    if (!result.hasOwnProperty(username)) {
      result[username] = {
        words,
        edited,
        deleted,
        tot_Char,
        longest,
        long_message,
        unique,
        messages,
        average: 0,
      };
    }
    let temp_size = data[i]["content"].length;
    if (data[i]["isDeleted"] === true) {
      result[username]["deleted"]++;
      deleted += 1;
      continue;
    } else if (data[i]["chat"]["createdAt"] != data[i]["chat"]["updatedAt"]) {
      edited += 1;
      result[username]["edited"]++;
    }
    let temp_uniq = data[i]["content"].split(" ");
    words += temp_uniq.length;
    result[username]["words"]+=temp_uniq.length
    for (let j = 0; j < temp_uniq.length; j++) {
      if (!unique.includes(temp_uniq[j])) {
        unique.push(temp_uniq[j]);
      }
    }
    tot_Char += temp_size;
    result[username]["total_Char"]+=temp_size;
    if(result[username]["longest"]<temp_size){
      result[username]["longest"]=temp_size;
      result[username]["long_message"]=data[i]["content"];
    }
    if (longest < temp_size) {
      longest = temp_size;
      long_message = data[i]["content"];
    }
    result[username]["average"]=result[username]["words"]/(result[username]["messages"]-result[username]["deleted"])
    // console.log(temp_size);
  }

  result["total"] = {
    words,
    edited,
    deleted,
    tot_Char,
    longest,
    long_message,
    unique,
    messages,
    average: words / Math.round(messages - deleted),
  };
  return result;
};
// ["sender"]["username"]
const sample = [
  {
    _id: "63da05382b9bdcf8fd819dfb",
    content: "hi",
    sender: {
      _id: "63d912b4f8bc673d6c98f7d2",
      username: "Dani",
      image:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    chat: {
      _id: "63da050e2b9bdcf8fd819ddc",
      chatName: "sender",
      isGroupChat: false,
      users: ["63da04fb2b9bdcf8fd819dd4", "63d912b4f8bc673d6c98f7d2"],
      createdAt: "2023-02-01T06:22:06.095Z",
      updatedAt: "2023-02-02T09:23:42.554Z",
      __v: 0,
      latestMessage: "63db811ee57ecb5d4da63768",
    },
    isDeleted: false,
    createdAt: "2023-02-01T06:22:48.929Z",
    updatedAt: "2023-02-01T06:23:05.100Z",
    __v: 0,
  },
  {
    _id: "63da05412b9bdcf8fd819e1b",
    content: "hello",
    sender: {
      _id: "63da04fb2b9bdcf8fd819dd4",
      username: "sample1",
      image:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    chat: {
      _id: "63da050e2b9bdcf8fd819ddc",
      chatName: "sender",
      isGroupChat: false,
      users: ["63da04fb2b9bdcf8fd819dd4", "63d912b4f8bc673d6c98f7d2"],
      createdAt: "2023-02-01T06:22:06.095Z",
      updatedAt: "2023-02-02T09:23:42.554Z",
      __v: 0,
      latestMessage: "63db811ee57ecb5d4da63768",
    },
    isDeleted: true,
    createdAt: "2023-02-01T06:22:57.393Z",
    updatedAt: "2023-02-01T06:23:11.751Z",
    __v: 0,
  },
  {
    _id: "63db80c3e57ecb5d4da63327",
    content: "hello",
    sender: {
      _id: "63d912b4f8bc673d6c98f7d2",
      username: "Dani",
      image:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    chat: {
      _id: "63da050e2b9bdcf8fd819ddc",
      chatName: "sender",
      isGroupChat: false,
      users: ["63da04fb2b9bdcf8fd819dd4", "63d912b4f8bc673d6c98f7d2"],
      createdAt: "2023-02-01T06:22:06.095Z",
      updatedAt: "2023-02-02T09:23:42.554Z",
      __v: 0,
      latestMessage: "63db811ee57ecb5d4da63768",
    },
    isDeleted: false,
    createdAt: "2023-02-02T09:22:11.273Z",
    updatedAt: "2023-02-02T09:22:11.273Z",
    __v: 0,
  },
  {
    _id: "63db80e0e57ecb5d4da63338",
    content: "narukuto ",
    sender: {
      _id: "63da04fb2b9bdcf8fd819dd4",
      username: "sample1",
      image:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    chat: {
      _id: "63da050e2b9bdcf8fd819ddc",
      chatName: "sender",
      isGroupChat: false,
      users: ["63da04fb2b9bdcf8fd819dd4", "63d912b4f8bc673d6c98f7d2"],
      createdAt: "2023-02-01T06:22:06.095Z",
      updatedAt: "2023-02-02T09:23:42.554Z",
      __v: 0,
      latestMessage: "63db811ee57ecb5d4da63768",
    },
    isDeleted: true,
    createdAt: "2023-02-02T09:22:40.427Z",
    updatedAt: "2023-02-02T09:22:48.207Z",
    __v: 0,
  },
  {
    _id: "63db8108e57ecb5d4da633d9",
    content: "hoi",
    sender: {
      _id: "63da04fb2b9bdcf8fd819dd4",
      username: "sample1",
      image:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    chat: {
      _id: "63da050e2b9bdcf8fd819ddc",
      chatName: "sender",
      isGroupChat: false,
      users: ["63da04fb2b9bdcf8fd819dd4", "63d912b4f8bc673d6c98f7d2"],
      createdAt: "2023-02-01T06:22:06.095Z",
      updatedAt: "2023-02-02T09:23:42.554Z",
      __v: 0,
      latestMessage: "63db811ee57ecb5d4da63768",
    },
    isDeleted: false,
    createdAt: "2023-02-02T09:23:20.915Z",
    updatedAt: "2023-02-02T09:23:31.070Z",
    __v: 0,
  },
  {
    _id: "63db811ee57ecb5d4da63768",
    content: "lol",
    sender: {
      _id: "63da04fb2b9bdcf8fd819dd4",
      username: "sample1",
      image:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    chat: {
      _id: "63da050e2b9bdcf8fd819ddc",
      chatName: "sender",
      isGroupChat: false,
      users: ["63da04fb2b9bdcf8fd819dd4", "63d912b4f8bc673d6c98f7d2"],
      createdAt: "2023-02-01T06:22:06.095Z",
      updatedAt: "2023-02-02T09:23:42.554Z",
      __v: 0,
      latestMessage: "63db811ee57ecb5d4da63768",
    },
    isDeleted: false,
    createdAt: "2023-02-02T09:23:42.538Z",
    updatedAt: "2023-02-02T09:23:42.538Z",
    __v: 0,
  },
];

console.log(getStats(sample));
