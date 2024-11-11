import React, { useState, useEffect} from "react";
import { useTransactionContext } from "../contexts/TransactionContext";
import Navbar from "../components/Navbar";
import EditModal from "../components/EditModal";
import AddModal from "../components/AddModal";
import DetailTransactionModal from "../components/DetailModal";

const Dashboard = () => {
  const [modalState, setModalState] = useState({
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDetailModalOpen: false,
  });
  const [editTransactionId, seteditTransactionId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    transactions,
    transaction,
    getTransaction,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactionContext();

  useEffect(() => {
    getTransaction();
    setLoading(false);
  }, []);

  const handleAddTransaction = async (transactionData) => {
    await createTransaction(transactionData);
    toggleModal("isAddModalOpen");
  };

  const handleEditTransaction = async (transactionData) => {
    if (editTransactionId) {
      await updateTransaction(editTransactionId, transactionData);
      toggleModal("isEditModalOpen");
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (transactionId) {
      await deleteTransaction(transactionId);
    }
  };

  const openDetailModal = async (id) => {
    await getTransactionById(id);
    toggleModal("isDetailModalOpen");
  };

  const openEditModal = async (id) => {
    await getTransactionById(id);
    seteditTransactionId(id);
    toggleModal("isEditModalOpen");
  };

  const filteredTransactions = transactions
  .filter((transaction) =>
    transaction.item.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .reverse();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleModal = (modalName) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
          role="status"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col sm:text-sm md:text:md bg-gray-100">
      <Navbar />
      <main className="flex-grow p-4 md:p-8 bg-gray-50">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-lg font-semibold">Transaction Data</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-auto">
                <i className="codicon codicon-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search Transaction"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => toggleModal("isAddModalOpen")}
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <i className="codicon codicon-add mr-2"></i>
                Add
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg bg-white">
              <thead className="block sm:table-header-group bg-gray-50 z-10">
                <tr className="text-left border-b">
                  <th className="p-4">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 w-36 sm:w-auto">Item</th>
                  <th className="px-4 hidden sm:table-cell">Price</th>
                  <th className="px-4 hidden sm:table-cell">Date</th>
                  <th className="px-4 hidden sm:table-cell">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="block sm:table-row mb-4 sm:mb-0"
                  >
                    <td className="p-4 sm:table-cell">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 w-36 sm:w-auto sm:table-cell">
                      {truncateText(transaction.item, 50)}
                    </td>
                    <td className="px-4 hidden sm:table-cell">
                      ${transaction.price}
                    </td>
                    <td className="px-4 hidden sm:table-cell">
                      {transaction.date}
                    </td>
                    <td className="px-4 hidden sm:table-cell">
                      <span
                        className={`inline-block px-3 py-1 rounded-full ${
                          transaction.status === "Pending"
                            ? "bg-yellow-200 text-yellow-700"
                            : transaction.status === "Completed"
                            ? "bg-green-200 text-green-700"
                            : ""
                        }`}
                      >
                        {transaction.status || "Completed"}
                      </span>
                    </td>
                    <td className="p-4 sm:table-cell">
                      <div className="flex justify-start space-x-2">
                        <button
                          onClick={() => openDetailModal(transaction.id)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                          <i className="codicon codicon-eye text-gray-600"></i>
                        </button>
                        <button
                          onClick={() => openEditModal(transaction.id)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                          <i className="codicon codicon-edit text-gray-600"></i>
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteTransaction(transaction.id)
                          }
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                          <i className="codicon codicon-trash text-gray-600"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 flex-wrap">
            <div className="text-sm text-gray-700 mb-2 sm:mb-0">
              Showing {itemsPerPage} per {totalItems} datas
            </div>
            <nav aria-label="Navigasi halaman" className="mt-2 sm:mt-0">
              <ul className="flex space-x-1 sm:space-x-2">
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 text-sm ${
                      currentPage === 1 ? "text-gray-400" : "text-surface"
                    }`}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-2 py-1 sm:px-3 sm:py-1.5 text-sm ${
                        index + 1 === currentPage
                          ? "bg-blue-500 text-white"
                          : "text-gray-600"
                      } rounded-lg`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 text-sm ${
                      currentPage === totalPages
                        ? "text-gray-400"
                        : "text-surface"
                    }`}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddModal
        isOpen={modalState.isAddModalOpen}
        onClose={() => toggleModal("isAddModalOpen")}
        onSubmit={handleAddTransaction}
      />
      <EditModal
        isOpen={modalState.isEditModalOpen}
        onClose={() => toggleModal("isEditModalOpen")}
        onSubmit={handleEditTransaction}
        initialValues={
          transaction && {
            item: transaction.item,
            price: transaction.price,
            date: transaction.date,
            status: transaction.status,
          }
        }
      />
      <DetailTransactionModal
        isOpen={modalState.isDetailModalOpen}
        onClose={() => toggleModal("isDetailModalOpen")}
        transaction={transaction}
      />
    </div>
  );
};

export default Dashboard;
