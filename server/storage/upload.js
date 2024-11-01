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
