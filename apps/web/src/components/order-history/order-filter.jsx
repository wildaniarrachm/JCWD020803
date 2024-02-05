import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useState } from 'react';
import { shipmentFunction } from '../../utils/transaction/shipment.function';

export const OrderFilter = ({
  handleResetFilters,
  handleSearchById,
  fetchByDate,
}) => {
  const { shipmentData } = shipmentFunction();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearchByDate = () => {
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      fetchByDate(formattedDate);
      setSelectedDate(null);
    }
  };

  return (
    <>
      <section>
        <div className="flex space-x-5 items-center overflow-x-auto">
          <div>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="input input-bordered focus:outline-none h-10 cursor-pointer"
            >
              <option value="">Select order ID</option>
              {shipmentData.map((data) => (
                <option value={data.id}>{data.id}</option>
              ))}
            </select>
          </div>
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select transaction date"
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
              if (selectedOrderId) {
                handleSearchById(selectedOrderId);
              } else {
                handleSearchByDate();
              }
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
