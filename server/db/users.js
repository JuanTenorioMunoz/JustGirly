// get all users

const supabase = require("../../services/supabase");

// https://supabase.com/docs/reference/javascript/insert
const createUser = async (object) => {
  const { data, error } = await supabase
    .from("users")
    .insert([object])
    .select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};
// https://supabase.com/docs/reference/javascript/select
const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getUserById = async (id) => {
  const { data, error } = await supabase.from("users").select().eq("id", id);
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

// https://supabase.com/docs/reference/javascript/update
const updateUser = async (id, object) => {
  const { data, error } = await supabase
    .from("users")
    .update(object)
    .eq("id", id)
    .select();

  return data;
};

// https://supabase.com/docs/reference/javascript/delete
const deleteUser = async (id) => {
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};