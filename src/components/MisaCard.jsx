const InvitationCard = () => {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="w-[85%] md:max-w-sm mx-auto bg-white/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        {/* Mensaje de Agradecimiento */}
        <div className="bg-purple-100 p-4 text-center text-purple-800">
          <p className="text-[15px] p-3">
            Antes de celebrar, queremos dar gracias a Dios por todas sus bendiciones. Por eso, te invitamos a acompañarnos en esta
          </p>
        </div>
        {/* Header Section */}
        <div className="bg-yellow-600 text-white p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Santa Misa por</h1>
          <p className="text-lg">Celebración de 50 Años</p>
        </div>

        {/* Image Section */}
        <div className="relative h-48 w-full">
          <img src="/parroquia.webp" alt="Parroquia Sagrada Familia" className="w-full h-full object-cover" />
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3 text-purple-700">
            <i className="fas fa-church w-5 h-5"></i>
            <span className="text-lg">Parroquia Sagrada Familia</span>
          </div>

          <div className="flex items-center space-x-3 text-purple-700">
            <i className="fas fa-clock w-5 h-5"></i>
            <span>6:00 PM</span>
          </div>

          <div className="flex items-center space-x-3 text-purple-700">
            <i className="fas fa-map-marker-alt w-5 h-5"></i>
            <span>11 de Enero, 2025</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* After Mass Section */}
          <div className="bg-purple-700 text-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <i className="fas fa-glass-cheers w-5 h-5"></i>
              <span className="font-semibold">Después de la Misa</span>
            </div>
            <p className="text-sm">Te invitamos a acompañarnos a...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
