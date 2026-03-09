import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const INDIA_STATE_CITIES = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
  Delhi: ["Delhi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
};

const HOSPITAL_DATA = [
  {
    id: 1,
    name: "City Care Hospital",
    state: "Maharashtra",
    city: "Mumbai",
    distanceKm: 2.4,
    rating: 4.7,
    contact: "+91 98765 10001",
  },
  {
    id: 2,
    name: "Lifeline Multispeciality",
    state: "Maharashtra",
    city: "Mumbai",
    distanceKm: 5.1,
    rating: 4.5,
    contact: "+91 98765 10002",
  },
  {
    id: 3,
    name: "Green Valley Hospital",
    state: "Karnataka",
    city: "Bengaluru",
    distanceKm: 3.2,
    rating: 4.6,
    contact: "+91 98765 10003",
  },
  {
    id: 4,
    name: "Metro Heart Institute",
    state: "Delhi",
    city: "Delhi",
    distanceKm: 4.8,
    rating: 4.4,
    contact: "+91 98765 10004",
  },
  {
    id: 5,
    name: "Sunrise Medical Center",
    state: "Tamil Nadu",
    city: "Chennai",
    distanceKm: 6.7,
    rating: 4.3,
    contact: "+91 98765 10005",
  },
  {
    id: 6,
    name: "Riverfront Hospital",
    state: "Gujarat",
    city: "Ahmedabad",
    distanceKm: 3.9,
    rating: 4.2,
    contact: "+91 98765 10006",
  },
];

export default function Hospital() {
  const navigate = useNavigate();
  const [stateInput, setStateInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [searched, setSearched] = useState(false);

  const availableStates = useMemo(() => Object.keys(INDIA_STATE_CITIES), []);

  const availableCities = useMemo(
    () => (stateInput ? INDIA_STATE_CITIES[stateInput] || [] : []),
    [stateInput]
  );

  const filteredHospitals = useMemo(() => {
    if (!searched) return [];
    return [...HOSPITAL_DATA].sort((a, b) => a.distanceKm - b.distanceKm);
  }, [searched]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setStateInput(newState);
    setCityInput("");
    setSearched(false);
  };

  const handleCityChange = (e) => {
    setCityInput(e.target.value);
    setSearched(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-100 px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 text-white p-8 md:p-10 shadow-xl mb-8">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-cyan-300/20 blur-xl" />
          <div className="relative z-10">
            <p className="uppercase tracking-widest text-xs md:text-sm text-blue-100 mb-2">
              Emergency Ready Network
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
              Find Nearby Hospitals
            </h1>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                <p className="text-2xl font-bold">24x7</p>
                <p className="text-blue-100 text-sm">Emergency Support</p>
              </div>
              <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                <p className="text-2xl font-bold">6+</p>
                <p className="text-blue-100 text-sm">Partner Hospitals</p>
              </div>
              <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                <p className="text-2xl font-bold">1-Tap</p>
                <p className="text-blue-100 text-sm">Consultation Access</p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-3xl shadow-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 border border-blue-100"
        >
          <select
            value={stateInput}
            onChange={handleStateChange}
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            required
          >
            <option value="">Select State</option>
            {availableStates.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>

          <select
            value={cityInput}
            onChange={handleCityChange}
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300 bg-white disabled:bg-gray-100 disabled:text-gray-400"
            disabled={!stateInput}
            required
          >
            <option value="">
              {stateInput ? "Select City" : "Select State first"}
            </option>
            {availableCities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white rounded-xl px-6 py-3 font-semibold hover:from-blue-800 hover:to-indigo-600 transition disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed"
            disabled={!stateInput || !cityInput}
          >
            Search Hospitals
          </button>
        </form>

        <div className="mt-8 space-y-4">
          {searched && filteredHospitals.length === 0 && (
            <div className="bg-white rounded-xl p-6 text-gray-600 shadow-sm">
              No hospitals found for this state/city combination.
            </div>
          )}

          {filteredHospitals.map((hospital) => (
            <button
              key={hospital.id}
              onClick={() => navigate("/consultation")}
              className="w-full text-left bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition border border-blue-100 hover:border-blue-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-blue-900 group-hover:text-indigo-700 transition">
                    {hospital.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {hospital.city}, {hospital.state}
                  </p>
                </div>
                <span className="inline-flex items-center self-start text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Verified Facility
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-gray-700">
                <div className="rounded-lg bg-blue-50 px-3 py-2">
                  📍 <span className="font-medium">{hospital.distanceKm} km away</span>
                </div>
                <div className="rounded-lg bg-yellow-50 px-3 py-2">
                  ⭐ <span className="font-medium">{hospital.rating} / 5</span>
                </div>
                <div className="rounded-lg bg-indigo-50 px-3 py-2">
                  📞 <span className="font-medium">{hospital.contact}</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-indigo-700 font-semibold">
                Continue to medical consultation →
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
