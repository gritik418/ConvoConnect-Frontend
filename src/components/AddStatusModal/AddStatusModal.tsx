import {
  selectUploadStatusLoading,
  uploadStatusAsync,
} from "@/features/status/statusSlice";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { IoIosImages } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const AddStatusModal = ({ isOpen, onClose }: PropsType) => {
  const [images, setImages] = useState<any>();
  const [content, setContent] = useState<string>("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const loading: boolean = useSelector(selectUploadStatusLoading);
  const dispatch = useDispatch<Dispatch<any>>();

  const handleStatusUpload = () => {
    console.log(images);
    dispatch(
      uploadStatusAsync({
        content: content,
        images,
      })
    );
  };

  const handleChangeImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === undefined) return;
    if (e.target.files!.length < 0) return;
    const imgPrev: string[] = [];
    const files: any[] = [];

    for (let index = 0; index < e.target.files!.length; index++) {
      const objectUrl = URL.createObjectURL(e.target.files![index]);
      imgPrev.push(objectUrl);
      files.push(e.target.files![index]);
    }

    setImages(files);
    setImagesPreview(imgPrev);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Status</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex p-3 items-center justify-center">
            <label
              htmlFor="images"
              className="flex items-center flex-col gap-2"
            >
              <IoIosImages className="text-6xl" />
              <input
                className="opacity-0 h-0 hidden"
                id="images"
                type="file"
                onChange={handleChangeImages}
                multiple
                maxLength={4}
              />
              <label
                htmlFor="images"
                className="cursor-pointer bg-[#3e335b] text-white px-3 py-1 rounded-md"
              >
                Add Images
              </label>
            </label>
          </div>

          <div className="flex">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-2 p-2 focus:outline-[#3e335b] w-full h-16 rounded-md resize-none border-gray-400"
              placeholder="Type here..."
            />
          </div>

          <div className="flex mt-4 gap-3 items-center justify-center">
            {imagesPreview.map((imgPrev, index) => {
              return (
                <div key={index} className="h-[80px] w-[60px] rounded-md">
                  <Image
                    className="h-[80px] w-[60px] rounded-md"
                    src={imgPrev}
                    alt=""
                    height={80}
                    width={60}
                  />
                </div>
              );
            })}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleStatusUpload}
            className="bg-[#3e335b] rounded-md"
          >
            {loading ? "Processing..." : "Upload Status"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddStatusModal;
