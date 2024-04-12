"use client";

import Modal from "react-modal";
import React, { useRef, useState } from "react";
import Input from "../InputBox/InputBox";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Model } from "@/types/model";
import { Session } from "next-auth";

interface MySession extends Session {
  supabaseAccessToken: string;
}

export default function Add({
  item,
  modelData,
  setModelData,
}: {
  item: Model | null;
  modelData: Array<Model | null>;
  setModelData: React.Dispatch<React.SetStateAction<Model[]>>;
}) {
  const Base_Url = process.env.NEXT_PUBLIC_BASE_URL;
  const [modalisOpen, setModalIsOpen] = useState(false);
  const nameref = useRef<HTMLInputElement>(null);
  const personalityref = useRef<HTMLInputElement>(null);
  const occupationref = useRef<HTMLInputElement>(null);
  const hobbiesref = useRef<HTMLInputElement>(null);
  const relationshipref = useRef<HTMLInputElement>(null);
  const bodyref = useRef<HTMLInputElement>(null);
  const ageref = useRef<HTMLInputElement>(null);
  const ethincityref = useRef<HTMLInputElement>(null);
  const descriptionref = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<(File | null)[]>([]);
  const { data, status } = useSession();
  const session = data as MySession;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (!images) return alert("No images selected");
    if (images && images.length && images?.length > 3) {
      return alert("You can only upload 3 images");
    }
    setFiles(Array.from(images));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      if (files.length !== 3) return alert("You can only upload 3 images");
      const formData = new FormData();
      const data = {
        name: nameref.current?.value,
        attributes: {
          "Personality Attributes": {
            Personality: personalityref.current?.value,
            Occupation: occupationref.current?.value,
            Hobbies: hobbiesref.current?.value,
            Relationship: relationshipref.current?.value,
          },
          "Physical Attributes": {
            Body: bodyref.current?.value,
            Age: ageref.current?.value,
            Ethincity: ethincityref.current?.value,
          },
        },
        description: descriptionref.current?.value,
      };
      formData.append("data", JSON.stringify(data));
      const result = await axios.post(`${Base_Url}/admin/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.supabaseAccessToken}`,
        },
      });
      if (modelData?.length === 0) setModelData([result.data.data]);
      setModelData([...modelData, result.data.data]);
      console.log(result.data.data.profile_images["0"]);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteModal = async () => {
    try {
      await axios.delete(`${Base_Url}/admin/delete/${item?.id}`, {
        headers: {
          Authorization: `Bearer ${session?.supabaseAccessToken}`,
        },
      });
      //   setData(Data.filter((data) => data.id !== item?.id));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {item === null ? (
        <div
          className="flex cursor-pointer gap-2 rounded-full p-2 pl-6 pr-6 text-sm hover:bg-[#3a3e57]"
          onClick={openModal}
        >
          <h1 className="text-lg font-semibold">Add Character</h1>
          {/* <Image src={adminplus} alt="add" /> */}
        </div>
      ) : (
        <button className="hover:text-primary" onClick={openModal}>
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
              fill=""
            />
            <path
              d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
              fill=""
            />
          </svg>
        </button>
      )}
      <Modal
        isOpen={modalisOpen}
        onRequestClose={closeModal}
        className="modal_add"
        overlayClassName="overlay"
      >
        <form
          className="flex flex-col gap-4 px-10 py-6 text-sm font-semibold text-black"
          onSubmit={handleClick}
        >
          <h1 className="text-2xl text-black">Add Character</h1>
          <div className="w-1/2">
            <label htmlFor="">Name</label>
            <Input
              type="text"
              placevalue=""
              vref={nameref}
              value={item?.name}
            />
          </div>
          <div>
            <h1>Personality Attributes</h1>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <label htmlFor="">Personality</label>
                <Input
                  type="text"
                  placevalue=""
                  vref={personalityref}
                  value={
                    item?.attributes?.["Personality Attributes"]?.Personality
                  }
                />
              </div>
              <div>
                <label htmlFor="">Occupation</label>
                <Input
                  type="text"
                  placevalue=""
                  vref={occupationref}
                  value={
                    item?.attributes?.["Personality Attributes"]?.Occupation
                  }
                />
              </div>
              <div>
                <label htmlFor="">Hobbies</label>
                <Input
                  type="text"
                  placevalue=""
                  vref={hobbiesref}
                  value={item?.attributes?.["Personality Attributes"]?.Hobbies}
                />
              </div>
              <div>
                <label htmlFor="">Relationship</label>
                <Input
                  type="text"
                  placevalue=""
                  vref={relationshipref}
                  value={
                    item?.attributes?.["Personality Attributes"]?.Relationship
                  }
                />
              </div>
            </div>
          </div>
          <div>
            <h1>Physical Attributes</h1>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <label htmlFor="">Body</label>
                <Input
                  type="text"
                  placevalue=""
                  vref={bodyref}
                  value={item?.attributes?.["Physical Attributes"]?.Body}
                />
              </div>
              <div>
                <label htmlFor="">Age</label>
                <Input
                  type="text"
                  placevalue=""
                  vref={ageref}
                  value={item?.attributes?.["Physical Attributes"]?.Age}
                />
              </div>
              <div>
                <label htmlFor="">Ethincity</label>
                <Input
                  type="text"
                  placevalue=""
                  vref={ethincityref}
                  value={item?.attributes?.["Physical Attributes"]?.Ethincity}
                />
              </div>
            </div>
            <div></div>
            <div>
              <label htmlFor="">Description</label>
              <Input
                type="text"
                placevalue=""
                vref={descriptionref}
                value={item?.system_prompts?.description}
              />
            </div>
          </div>
          <div>
            <h1>Gallery</h1>
            <div className="flex justify-between pt-2">
              <h1>Upload Images</h1>
              <input
                type="file"
                // value={item?.profile_images}
                multiple
                onChange={handleFileChange}
                className="p-0"
              />
            </div>
            <div className="flex justify-between pt-4">
              <button
                onClick={closeModal}
                className="w-1/3 rounded-3xl bg-primary px-10 py-2 text-white hover:bg-[#17269e]"
              >
                Cancel
              </button>
              {item === null ? (
                <button
                  type="submit"
                  className="w-1/3 rounded-3xl bg-primary px-10 py-2 text-white hover:bg-[#17269e]"
                >
                  Save
                </button>
              ) : (
                <button className="w-1/3 rounded-3xl bg-primary px-10 py-2 text-white hover:bg-[#17269e]">
                  Update
                </button>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
