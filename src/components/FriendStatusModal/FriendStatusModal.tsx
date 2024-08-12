import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Swiper } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import styles from "./FriendStatusModal.module.css";
import Image from "next/image";
import { StatusType } from "../StatusSection/StatusSection";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  status: StatusType;
};

const FriendStatusModal = ({ isOpen, onClose, status }: PropsType) => {
  useEffect(() => {
    if (!status) return;

    let statusLength: number = status.images?.length || 0;

    if (statusLength === 0) {
      statusLength += 1;
    }
    const timerId = setTimeout(() => {
      onClose();
    }, statusLength * 3 * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [status, isOpen, onClose]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody className="">
          {status && status.images!.length > 0 && (
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
                        className="h-full object-contain m-0"
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
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FriendStatusModal;
