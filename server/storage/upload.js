const supabase = require("../services/supabase");

// https://supabase.com/docs/reference/javascript/storage-from-upload
const uploadImage = async (fileName, imageBuffer) => {
  const { data, error } = await supabase.storage
    .from("bucket_name")
    .upload(fileName, imageBuffer);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  return data;
};

module.exports = { uploadImage };


// const fetch = require("node-fetch");

// const uploadImageFromUrl = async (imageUrl, fileName) => {
//   try {
//     // Fetch the image from the URL
//     const response = await fetch(imageUrl);
    
//     if (!response.ok) {
//       throw new Error(`Failed to fetch image: ${response.statusText}`);
//     }

//     // Convert the response stream to a buffer
//     const imageBuffer = await response.buffer();

//     // Upload the image buffer to Supabase storage
//     const { data, error } = await supabase.storage
//       .from("bucket_name")
//       .upload(fileName, imageBuffer);

//     if (error) {
//       console.error("Error uploading image:", error);
//       return null;
//     }

//     return data;
//   } catch (error) {
//     console.error("Error fetching image from URL:", error);
//     return null;
//   }
// };

// module.exports = { uploadImageFromUrl };

