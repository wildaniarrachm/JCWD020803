import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useState } from 'react';

export const OrderFilter = ({
  searchTerm,
  setSearchTerm,
  handleResetFilters,
  handleSearchById,
  fetchByDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearchByDate = () => {
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      fetchByDate(formattedDate);
      setSelectedDate(null);
      fetchByDate(formattedDate);
    }
  };

  return (
    <>
      <section className="">
        <div className="flex space-x-5 items-center overflow-x-auto">
          <div>
            <input
              type="text"
              placeholder="Cari transaksimu berdasarkan order number"
              className="input input-bordered focus:outline-none w-[35vw] h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Pilih tanggal transaksi"
              className="input input-bordered focus:outline-none h-10 cursor-pointer"
            />
          </div>
          <div>
            <button
              onClick={handleResetFilters}
              className="ml-2 text-main-red font-bold"
            >
              Reset Filters
            </button>
          </div>
          <button
            onClick={() => {
              handleSearchById() || handleSearchByDate();
            }}
            className="bg-[#00AA5B] px-5 py-2 rounded-md ml-2 font-bold text-white"
          >
            Search
          </button>
        </div>
      </section>
    </>
  );
};
