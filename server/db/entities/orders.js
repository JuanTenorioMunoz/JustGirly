// get all users

const supabase = require("../../services/supabase");

// https://supabase.com/docs/reference/javascript/insert
const createOrder = async (object) => {
  const { data, error } = await supabase
    .from("orders")
    .insert([object])
    .select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};
// https://supabase.com/docs/reference/javascript/select
const getAllOrders = async () => {
  const { data, error } = await supabase.from("orders").select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getOrderById = async (id) => {
  const { data, error } = await supabase.from("orders").select().eq("id", id);
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

// https://supabase.com/docs/reference/javascript/update
const updateOrder = async (id, object) => {
  const { data, error } = await supabase
    .from("orders")
    .update(object)
    .eq("id", id)
    .select();

  return data;
};

// https://supabase.com/docs/reference/javascript/delete
const deleteOrder = async (id) => {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
};