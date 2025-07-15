const ProfessionalSection = ({ formData, handleChange }) => {
    return (
        <>
            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">CURRENT JOB TITLE<span className="text-red-500">*</span></label>
                <input
                    name="jobTitle"
                    type="text"
                    required
                    value={formData.jobTitle || ""}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer, QA Analyst"
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">COMPANY NAME<span className="text-red-500">*</span></label>
                <input
                    name="company"
                    type="text"
                    required
                    value={formData.company || ""}
                    onChange={handleChange}
                    placeholder="e.g. TCS, Accenture, Start-up"
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">TOTAL WORK EXPERIENCE (YEARS)<span className="text-red-500">*</span></label>
                <input
                    name="experienceYears"
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={formData.experienceYears || ""}
                    onChange={handleChange}
                    placeholder="e.g. 2.5"
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">KEY DOMAINS OR PROJECTS</label>
                <textarea
                    name="projectDomains"
                    rows="3"
                    value={formData.projectDomains || ""}
                    onChange={handleChange}
                    placeholder="e.g. Web Dev, Automation Testing, Cloud Migration"
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">WHY PURSUING HIGHER STUDIES?<span className="text-red-500">*</span></label>
                <textarea
                    name="careerGoal"
                    rows="3"
                    required
                    value={formData.careerGoal || ""}
                    onChange={handleChange}
                    placeholder="e.g. Want to move from QA to Data Science, Upskill, etc."
                    className="mt-1 p-3 text-black w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
            </div>
        </>
    );
};

export default ProfessionalSection;
