import FormTransaction from "./Form";
import Modal from "./Modal";

const AddModal = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg text-center font-semibold mb-4">Add Transaction</h2>
      <FormTransaction onSubmit={onSubmit} buttonText="Add Transaction" />
    </Modal>
  );
};

export default AddModal;
