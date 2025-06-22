const CounsellingForm = ({ formData, setFormData, emailRef, errors, loading, onSubmit }) => {

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    const formatDate = (date) => date.toISOString().split("T")[0];

    return (
        <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
            <div>
                <label className="text-sm font-medium text-gray-700">
                    FULL NAME (AS PER GOVERNMENT ID)<span className="text-red-500">*</span>
                </label>
                <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your full name"
                />
            </div >

            <div>
                <label className="text-sm font-medium text-gray-700">
                    EMAIL ADDRESS<span className="text-red-500">*</span>
                </label>
                <input
                    ref={emailRef}
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    placeholder="name@gmail.com"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">
                    Phone Number<span
                        className="text-red-500">*</span>
                </label>
                <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    placeholder="+91 98765 43210"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">Field of Interest</label>
                <input
                    name="fieldOfIntrest"
                    type="text"
                    value={formData.fieldOfIntrest}
                    onChange={handleChange}
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. Data Science"
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                    Academic Background<span className="text-red-500">*</span>
                </label>
                <textarea
                    name="academicBackground"
                    rows="3"
                    required
                    value={formData.academicBackground}
                    onChange={handleChange}
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    placeholder="Mention your degree, GPA, experience..."
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">What are you expecting from the call?</label>
                <textarea
                    name="expectationsFromcall"
                    rows="3"
                    value={formData.expectationsFromcall}
                    onChange={handleChange}
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Preferred Mode<span className="text-red-500">*</span></label>
                <select
                    name="mode"
                    required
                    value={formData.mode}
                    onChange={handleChange}
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">-- Select Mode --</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                </select>
            </div>

            <div className="md:col-span-2 relative">
                <label className="text-sm font-medium text-gray-700">
                    Preferred Date<span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    name="dateOfCall"
                    required
                    value={formData.dateOfCall || ""}
                    onChange={handleChange}
                    min={formatDate(today)}
                    max={formatDate(maxDate)}
                    className="peer text-black w-full p-3 rounded border border-gray-300 mt-1 bg-white cursor-pointer focus:ring-2 focus:ring-blue-400 appearance-none"
                />

                {!formData.dateOfCall && (
                    <span className="md:hidden absolute left-3 top-[49px] text-gray-400 text-sm pointer-events-none peer-focus:hidden sm:text-base">
                        Select a date
                    </span>
                )}
            </div>

            {
                errors.general && (
                    <div className="col-span-2 text-red-600 text-sm mt-2">{errors.general}</div>
                )
            }

            <div className="md:col-span-2 text-center">
                <button
                    type="submit"
                    disabled={loading}
                    className={`${loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
                        } text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-200 shadow-md`}
                >
                    {loading ? "Proceeding..." : "Pay ₹250 & Book Session"}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                    Payment will be processed via secure gateway.
                </p>
            </div>
        </form >
    )
}

export default CounsellingForm