const StudentSection = ({ formData, handleChange }) => {
    return (
        <>
            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">COLLEGE / UNIVERSITY NAME<span className="text-red-500">*</span></label>
                <input
                    name="collegeName"
                    type="text"
                    required
                    value={formData.collegeName || ""}
                    onChange={handleChange}
                    placeholder="e.g. VIT Vellore, Anna University"
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">BRANCH / DEGREE PROGRAM<span className="text-red-500">*</span></label>
                <input
                    name="branch"
                    type="text"
                    required
                    value={formData.branch || ""}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech CSE, B.Sc Physics"
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">CGPA / PERCENTAGE<span className="text-red-500">*</span></label>
                <input
                    name="cgpa"
                    type="text"
                    required
                    value={formData.cgpa || ""}
                    onChange={handleChange}
                    placeholder="e.g. 8.2 / 75%"
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">YEAR OF GRADUATION<span className="text-red-500">*</span></label>
                <input
                    name="graduationYear"
                    type="number"
                    min="2000"
                    max={new Date().getFullYear() + 5}
                    required
                    value={formData.graduationYear || ""}
                    onChange={handleChange}
                    placeholder="e.g. 2024"
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">ANY BACKLOGS?<span className="text-red-500">*</span></label>
                <select
                    name="backlogs"
                    required
                    value={formData.backlogs || ""}
                    onChange={handleChange}
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">-- Select --</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>
        </>
    );
};

export default StudentSection;
