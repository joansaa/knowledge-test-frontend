import React from "react";
import Modal from "./Modal";
import FormTransaction from "./Form";

const EditModal = ({ isOpen, onClose, onSubmit, initialValues }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg text-center font-semibold mb-4">Edit Transaction</h2>
      <FormTransaction
        onSubmit={onSubmit}
        initialValues={initialValues}
        buttonText="Save Changes"
      />
    </Modal>
  );
};

export default EditModal;
