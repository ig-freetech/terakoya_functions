import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { User } from "@apis/(user)/common";
import {
  useFetchUserProfile,
  useUpdateUserProfile,
} from "@apis/(user)/profile";
import { useRedirectToSignIn } from "@hooks/useAuth";
import { useUserStore } from "@stores/user";

export const useProfile = (uuid: string) => {
  const { user, setLoggedInUser } = useUserStore();
  useRedirectToSignIn();

  const { isLoading, isError, refetch } = useFetchUserProfile(uuid, {
    // ユーザーのUUIDを利用
    onSuccess: (data) => {
      setLoggedInUser(data);
    },
    onError: (error) => {
      toast.error(`エラーが発生しました。\n${error}`);
    },
  });

  const { register, reset, handleSubmit } = useForm<User>({
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      grade: -1,
      school: "",
      course_choice: -1,
    },
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const { mutate: update, isLoading: isUpdating } = useUpdateUserProfile(uuid);

  const onSubmit = handleSubmit((inputs) => {
    update(inputs, {
      onSuccess: () => {
        setLoggedInUser(inputs);
        toast.success("プロフィールを更新しました。");
      },
      onError: (error) => {
        toast.error(`エラーが発生しました。\n${error}`);
      },
    });
  });

  return {
    isLoading,
    isError,
    user,
    refetch,
    register,
    onSubmit,
    isUpdating,
  };
};
