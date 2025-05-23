import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  //  use get session, so this will actually get that data from local storage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // can get the user from the session, but it is a bite secure to just redownload every-
  // from the supabase
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(Error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. updata the password or fullName
  let updateData;

  // These two can be true one at the same time, that why we wrote like this
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. if upload avatar is successed then Update avatar in the user
  const { data: updatedUser, error: errorUpdate } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
      },
    });

  if (errorUpdate) throw new Error(errorUpdate.message);
  console.log(updateCurrentUser);

  return updatedUser;
}
