export const StatusOrder = ({ handleStatusClick }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row xl:space-x-2 md:items-center mt-14">
        <p className="font-bold -mt-11 xl:-mt-0">Status</p>
        <div className="flex space-x-2 xl:space-x-4 overflow-x-auto xl:overflow-x-visible rounded-lg pb-11 xl:pb-0">
          <div
            onClick={() => handleStatusClick('all')}
            className={`w-fit bg-main-red px-4 py-1.5 rounded-lg text-white font-bold cursor-pointer`}
          >
            Semua
          </div>
          <div className="dropdown dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="w-fit bg-main-red px-4 py-1.5 rounded-lg text-white font-bold cursor-pointer"
            >
              Berlangsung
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content -ml-[23.7vw] md:-ml-[10.5vw] xl:-ml-[7.8vw]"
            >
              <div className="flex space-x-4 mt-2 md:overflow-x-auto xl:overflow-visible">
                <li className="w-[54vw] md:w-[24vw] xl:w-[17vw] h-fit bg-main-red py-1.5 text-center rounded-lg text-white font-bold cursor-pointer">
                  <a onClick={() => handleStatusClick('menunggu pembayaran')}>
                    Menunggu pembayaran
                  </a>
                </li>
                <li className="w-[52vw] md:w-[23vw] xl:w-[16vw] h-fit bg-main-red py-1.5 text-center rounded-lg text-white font-bold cursor-pointer">
                  <a onClick={() => handleStatusClick('menunggu konfirmasi')}>
                    Menunggu konfirmasi
                  </a>
                </li>
                <li className="w-[26vw] md:w-[12vw] xl:w-[8vw] h-fit bg-main-red py-1.5 text-center rounded-lg text-white font-bold cursor-pointer">
                  <a onClick={() => handleStatusClick('diproses')}>Diproses</a>
                </li>
              </div>
            </ul>
          </div>
          <div className="w-fit bg-main-red px-4 py-1.5 rounded-lg text-white font-bold cursor-pointer">
            Berhasil
          </div>
          <div
            onClick={() => handleStatusClick('dibatalkan')}
            className={`w-fit bg-main-red px-4 py-1.5 rounded-lg text-white font-bold cursor-pointer`}
          >
            Dibatalkan
          </div>
        </div>
      </div>
    </>
  );
};
