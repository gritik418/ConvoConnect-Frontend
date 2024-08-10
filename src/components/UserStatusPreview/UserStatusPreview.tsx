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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./UserStatusPreview.module.css";
import {
  removeUserStatusAsync,
  selectRemoveStatusLoading,
  selectStatus,
} from "@/features/status/statusSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Dispatch } from "@reduxjs/toolkit";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const UserStatusPreview = ({ isOpen, onClose }: PropsType) => {
  const status = useSelector(selectStatus);
  const loading: boolean = useSelector(selectRemoveStatusLoading);
  const dispatch = useDispatch<Dispatch<any>>();

  const handleRemoveStatus = () => {
    dispatch(removeUserStatusAsync());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your Status</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="rounded-md p-5">
          {status && status.images?.length > 0 && (
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={false}
              modules={[Autoplay, Pagination]}
              className="h-[450px] w-full rounded-sm my-3"
            >
              {status.images &&
                status.images.map((image: string, index: number) => {
                  return (
                    <SwiperSlide className={styles.swiperSlide} key={index}>
                      <Image
                        className="h-full object-contain"
                        src={image}
                        alt=""
                        height={450}
                        width={350}
                      />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          )}

          {status.content && (
            <p className="bg-gray-200 rounded-md py-2 px-3">{status.content}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleRemoveStatus}
            className="bg-[#3e335b] rounded-md"
          >
            {loading ? "Processing..." : "Remove Status"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserStatusPreview;
