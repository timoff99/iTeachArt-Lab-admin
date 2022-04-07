import React, { useContext, useState } from "react";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import UserService from "services/user.service";
import ImageService from "services/image.service";
import { IAuthUser, UserContext } from "shared/ui-kit/UserProvider";

import { SettingsView } from "../componets";
import { FormPasswordData, IUpdatedUserFiled } from "shared/interfaces/Settings";
import { useMutation } from "react-query";

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
  const [changePassword, setChangePassword] = useState<FormPasswordData | null>(null);
  const { user, setUser } = useContext(UserContext);
  const formData = new FormData();

  const handleOpenNameInput = () => {
    setPersonName((prev) => !prev);
  };
  const handleOpenEmailInput = () => {
    setPersonEmail((prev) => !prev);
  };
  const handleOpenPasswordInput = () => {
    setPersonPassword((prev) => !prev);
  };

  const successNotify = (msg: string) => {
    return toast.success(msg);
  };
  const errorNotify = (errors: { message: string }) => {
    if (errors.message) {
      return toast.error(errors.message);
    }
  };

  const updateUserMutation = useMutation(
    (updatedFiled: { image: string; cloudinary_id: string } | IUpdatedUserFiled) =>
      UserService.updateUser(updatedFiled),
    {
      onSuccess: ({ data }: { data: { updateUser: IAuthUser } }) => setUser(data.updateUser),
    }
  );

  const ImageMutation = useMutation((formData: FormData) => ImageService.addImage(formData), {
    onSuccess: ({ data }: { data: { secure_url: string; public_id: string } }) => {
      const updatedFiled = { image: data.secure_url, cloudinary_id: data.public_id };
      updateUserMutation.mutate(updatedFiled);
    },
  });

  const setImage = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    formData.append("image", file);
    ImageMutation.mutate(formData);
  };

  const saveNewUserInfo = async (e: React.KeyboardEvent<HTMLDivElement> & { target: HTMLInputElement }) => {
    try {
      if (e.key === "Enter") {
        e.preventDefault();
        const updatedValue = e.target.value;
        const inputName = e.target.name;
        const updatedFiled: IUpdatedUserFiled = { [inputName]: updatedValue };
        updateUserMutation.mutate(updatedFiled);
        e.target.value = "";
        setPersonName(false);
        setPersonEmail(false);
        successNotify(`user ${inputName} updated`);
      }
    } catch (e: any) {
      return errorNotify(e.response.data);
    }
  };

  const saveNewUserPassword = async (e: React.KeyboardEvent<HTMLDivElement> & { target: HTMLInputElement }) => {
    try {
      e.preventDefault();
      const updatedFiled = { ...changePassword };
      const data: CustomAxiosResponse = await UserService.updateUser(updatedFiled);
      if (data?.response?.data) throw data;
      setUser(data.data.updateUser);
      setChangePassword(null);
      setPersonPassword(false);
      successNotify("user password updated");
    } catch (err: any) {
      return errorNotify(err.response.data);
    }
  };
  return (
    <>
      {user && (
        <SettingsView
          personName={personName}
          personEmail={personEmail}
          personPassword={personPassword}
          handleOpenNameInput={handleOpenNameInput}
          handleOpenEmailInput={handleOpenEmailInput}
          handleOpenPasswordInput={handleOpenPasswordInput}
          saveNewUserInfo={saveNewUserInfo}
          saveNewUserPassword={saveNewUserPassword}
          setChangePassword={setChangePassword}
          setImage={setImage}
          user={user}
        />
      )}
    </>
  );
};
