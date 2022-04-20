import React, { useContext, useState } from "react";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import UserService from "services/user.service";
import ImageService from "services/image.service";
import { IAuthUser, UserContext } from "shared/ui-kit/UserProvider";

import { SettingsView } from "../componets";
import { IUpdatedUserFiled } from "shared/interfaces/Settings";
import { useMutation } from "react-query";
import { Skeleton } from "@mui/material";
import { useFormik } from "formik";
import { IChangePassword } from "shared/types/changePassword";
import { changePasswordSchema } from "shared/shema/changePassword";

interface IResponseData {
  data: string;
}

interface CustomAxiosResponse extends AxiosResponse<any, any> {
  response?: IResponseData;
}

export const SettingsContainer = () => {
  const [personName, setPersonName] = useState(false);
  const [personEmail, setPersonEmail] = useState(false);
  const [personPassword, setPersonPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);
  const formData = new FormData();

  const successNotify = (msg: string) => {
    return toast.success(msg);
  };
  const errorNotify = (errors: { message: string }) => {
    if (errors.message) {
      return toast.error(errors.message);
    }
  };

  const updateUserMutation = useMutation((updatedFiled: IUpdatedUserFiled) => UserService.updateUser(updatedFiled), {
    onSuccess: ({ data }: { data: { updateUser: IAuthUser } }) => {
      setUser(data.updateUser);
    },
    onSettled: () => setLoading(false),
  });

  const updateUserImageMutation = useMutation(
    (updatedFiled: { image: string; cloudinary_id: string }) => UserService.updateUser(updatedFiled),
    {
      onSuccess: ({ data }: { data: { updateUser: IAuthUser } }) => {
        setUser(data.updateUser);
        successNotify("image upload successfully");
      },
      onSettled: () => setLoading(false),
    }
  );

  const ImageMutation = useMutation((formData: FormData) => ImageService.addImage(formData), {
    onSuccess: ({ data }: { data: { secure_url: string; public_id: string } }) => {
      const updatedFiled = { image: data.secure_url, cloudinary_id: data.public_id };
      updateUserImageMutation.mutate(updatedFiled);
    },
  });

  const setImage = async (e: React.ChangeEvent) => {
    setLoading(true);
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    formData.append("image", file);
    ImageMutation.mutate(formData);
  };

  const saveNewUserInfo = async (e: React.KeyboardEvent<HTMLDivElement> & { target: HTMLInputElement[] }) => {
    try {
      e.preventDefault();
      const updatedValue = e.target[0].value;
      const inputName = e.target[0].name;
      const updatedFiled: IUpdatedUserFiled = { [inputName]: updatedValue };
      updateUserMutation.mutate(updatedFiled);
      e.target[0].value = "";
      setPersonName(false);
      setPersonEmail(false);
      successNotify(`user ${inputName} updated`);
    } catch (e: any) {
      return errorNotify(e.response.data);
    }
  };

  const saveNewUserPassword = async (values: IChangePassword) => {
    try {
      const updatedFiled = { ...values };
      const data: CustomAxiosResponse = await UserService.updateUser(updatedFiled);
      if (data?.response?.data) throw data;
      setUser(data.data.updateUser);
      setPersonPassword(false);
      values = {
        oldPassword: "",
        newPassword: "",
      };
      successNotify("user password updated");
    } catch (err: any) {
      return errorNotify(err.response.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: saveNewUserPassword,
  });

  return (
    <>
      {user ? (
        <SettingsView
          personName={personName}
          personEmail={personEmail}
          personPassword={personPassword}
          setPersonName={setPersonName}
          setPersonEmail={setPersonEmail}
          setPersonPassword={setPersonPassword}
          saveNewUserInfo={saveNewUserInfo}
          setImage={setImage}
          user={user}
          loading={loading}
          formik={formik}
        />
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={500} sx={{ borderRadius: 2 }} />
      )}
    </>
  );
};
