const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Coudnt Find Img");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Failed To Write");
      resolve();
    });
  });
};

const getDogPic = async function () {
  try {
    let data = await readFilePromise("./dog.txt");
    console.log(`Breed is :${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    console.log(res.body.message);

    await writeFilePromise("dog-img.txt", res.body.message);
  } catch (err) {
    console.log(err.message || err);
    throw err.message || err;
  }
  return "done";
};

(async () => {
  try {
    const x = await getDogPic();
    console.log(x);
  } catch (err) {
    console.log("Error");
  }
})();

// getDogPic()
//   .then((data) => data)
//   .catch(() => {
//     console.log("Error");
//   });

// readFilePromise("./dog.txt")
//   .then((data) => {
//     console.log(`Breed is :${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     return writeFilePromise("dog-img.txt", res.body.message);
//   })
//   .catch((err) => {
//     console.log(err.message || err);
//   });

// fs.readFile("./dog.txt", (err, data) => {
//   console.log(`Breed is :${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         console.log("Dog Img Saved");
//       });
//     })
//     .catch((err) => {
//       console.log(res.body.message);
//     });
// });
