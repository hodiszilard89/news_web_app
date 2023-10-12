import React, { useState, FC } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { boolean } from "yup";

interface PagiantedProps {
    isOpen:boolean,
    onClose:()=>void,
    items:string []
}



const PaginatedModal:FC<PagiantedProps> = ({ isOpen, onClose, items }) =>{
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < items.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Page {currentPage + 1}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{items[currentPage]}</ModalBody>
        <ModalFooter>
          <form>
            <label>email</label>
            <input type="text" />
            <button type="submit">submit</button>
          </form>
          {currentPage > 0 && <button onClick={handlePrevPage}>Previous</button>}
          {currentPage < items.length - 1 && <button onClick={handleNextPage}>Next</button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaginatedModal;
