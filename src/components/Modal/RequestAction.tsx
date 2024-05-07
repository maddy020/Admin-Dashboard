"use client";

import Modal from "react-modal";
import React, { useRef, useState } from "react";
import Input from "../InputBox/InputBox";
import axios from "axios";
import { tokenrequest } from "../../types/tokenrequest";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface MySession extends Session {
  supabaseAccessToken: string;
}

export default function RequestAction({
  req,
  requests,
  setRequests,
}: {
  req: tokenrequest;
  requests: tokenrequest[];
  setRequests: React.Dispatch<React.SetStateAction<tokenrequest[]>>;
}) {
  const Base_Url = process.env.NEXT_PUBLIC_BASE_URL;
  const { data, status } = useSession();
  const session = data as MySession;
  const [modalisOpen, setModalIsOpen] = useState(false);
  const assignedToken = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (assignedToken.current === null) return;
    const tokenVal = parseInt(assignedToken.current.value);
    if (tokenVal <= 0) {
      return alert("Token value can not be less than or equal to 0");
    }
    try {
      await axios.post(
        `${Base_Url}/admin/assignTokens/${req.userId}`,
        { tokenVal },
        {
          headers: {
            Authorization: `Bearer ${session?.supabaseAccessToken}`,
          },
        },
      );
      setRequests(requests.filter((item) => item.userId !== req.userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="rounded-lg border-2 border-slate-500 px-2 py-1 hover:bg-slate-800"
        onClick={() => setModalIsOpen(true)}
      >
        View
      </button>
      <Modal
        isOpen={modalisOpen}
        onRequestClose={closeModal}
        className="modal_request"
        overlayClassName="overlay"
      >
        <form
          className="flex flex-col gap-2 px-10 py-4 text-sm font-semibold text-black"
          onSubmit={handleSubmit}
        >
          <h1 className="text-lg font-bold ">Request Details</h1>

          <label htmlFor="">Requested Tokens</label>
          <input
            value={req.requested_tokens}
            className="w-full rounded-lg border-2 border-slate-300 p-2 text-black focus:border-blue-700 focus:outline-none "
          />
          <label htmlFor="">Assigned Tokens</label>
          <Input
            type="number"
            placevalue="Assign Tokens"
            vref={assignedToken}
          />
          <div className="flex justify-between pt-4">
            <button
              onClick={closeModal}
              className="w-1/3 rounded-3xl bg-primary px-10 py-2 text-white hover:bg-[#17269e]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/3 rounded-3xl bg-primary px-10 py-2 text-white hover:bg-[#17269e]"
            >
              Assign
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
