import React from "react";
import Modal from "./Modal";

const DetailTransactionModal = ({ isOpen, onClose, transaction }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg text-center font-semibold mb-6">Transaction Details</h2>
      {transaction && (
        <div className="text-left space-y-4">
          <div className="flex">
            <p className="font-semibold w-20">Item</p>
            <p>: {transaction.item}</p>
          </div>
          <div className="flex">
            <p className="font-semibold w-20">Price</p>
            <p>: ${transaction.price}</p>
          </div>
          <div className="flex">
            <p className="font-semibold w-20">Date</p>
            <p>: {transaction.date}</p>
          </div>
          <div className="flex">
            <p className="font-semibold w-20">Status</p>
            <p>: {transaction.status}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailTransactionModal;
