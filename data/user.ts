import { supabaseAdmin } from "@/lib/supabase";

export const getUserByEmail = async (email: string) => {
  try {
    console.log('Looking up user with email:', email);
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user by email:', error);
      return null;
    }
    
    console.log('User lookup result:', data ? 'Found' : 'Not found');
    return data;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select(`
        *,
        addresses(*)
      `)
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user by id:', error);
      return null;
    }
    
    // Transform the data to match the expected structure
    if (data && data.addresses && data.addresses.length > 0) {
      data.address = data.addresses[0];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    return null;
  }
};

export const getUserRoleByID = async (id: string) => {
  try {
    const user = await getUserById(id);
    return user?.role;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};