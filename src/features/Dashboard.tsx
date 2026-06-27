import { CircleUserRound, SlidersHorizontal } from "lucide-react";
import useClinicWorker from "../hooks/useClinicWorker";
import SideNav from "../ui/SideNav";
import { useClinicalStore, type TriageSeverity } from "../store/useClinicalStore";
import { useState } from "react";
   
const severityfilters:TriageSeverity[] = ['ALL', 'CRITICAL', 'STABLE']

function Dashboard() {
    const [openFilter, setOpenFilter] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  const { computedData } = useClinicWorker();
  const searchedPatients = computedData?.filteredPatients.filter(patient => 
  patient.name.toLowerCase().includes(searchQuery.toLowerCase())
) || [];
  const {setSeverityFilter} = useClinicalStore();

  const toggleFilter = () =>{
    setOpenFilter(!openFilter);
  }
  return (
    <div className="min-h-screen bg-bg-2 flex gap-2">
      <SideNav />
      <main className="flex-1 ">
        {/* header */}
        <div className="bg-white px-6 py-[6px]">
          <h6 className="font-medium text-lg">Patients</h6>
          <p className="text-gray-600 ">
            All patients informaton in one place.
          </p>
        </div>
        {/* Patients Analysis */}
        <div className="p-6 grid grid-cols-3 gap-4">
          <div className="flex items-center  bg-white p-2 rounded-md shadow-sm">
            <p className="h-12 w-[5px] rounded bg-[#0d0d0d] mr-2"></p>
            <div>
              <p className="text-3xl font-semibold mb-[1px]">
                {computedData?.totalCount}
              </p>
              <p className="text-gray-600">Total Patients</p>
            </div>
          </div>
          <div className="flex items-center   bg-white p-2 rounded-md shadow-sm">
            <p className="h-12 w-[5px] rounded bg-[#0a8d6b] mr-2"></p>
            <div>
              <p className="text-3xl font-semibold mb-[1px]">
                {computedData?.stableCount}
              </p>
              <p className="text-gray-600">Stable Patients</p>
            </div>
          </div>
          <div className="flex items-center   bg-white p-2 rounded-md shadow-sm">
            <p className="h-12 w-[5px] rounded bg-[#d84945] mr-2"></p>
            <div>
              <p className="text-3xl font-semibold mb-[1px]">
                {computedData?.criticalCount}
              </p>
              <p className="text-gray-600">Critical Patients</p>
            </div>
          </div>
        </div>

        {/* Patient lists */}
        <div className="px-6 ">
          <div className="bg-white">
            <div className="pl-6 pt-4 max-w-xl grid grid-cols-2 gap-4 ">
              <input
                type="text"
                placeholder="Search patient..."
                value={searchQuery} // Binds your element to look at your state variable
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-[6px] mb-4 text-sm text-gray-600 shadow-sm outline-none placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
              <div className="relative inline-block">
                 <button className="flex items-center gap-2 p-2 border border-gray-200 rounded-sm"
                 onClick={()=>toggleFilter()}
                 ><SlidersHorizontal size={20} /> Filter</button>
                 <div className={` bg-white  z-1 absolute ${openFilter ? 'block': 'hidden'}`}>
                    {severityfilters.map(filter => (
                          <button  className="block p-2"
                          onClick={()=>
                          {
                            setSeverityFilter(filter); 
                            toggleFilter();
                          }
                            
                    }>{filter}</button>
                    ))}
                 </div>
              </div>
            </div>

            {/* table */}
            <div className=" px-6 py-2 overflow-auto max-h-[500px]">
              <table className="w-full border-collapse ">
                <thead className=" racking-wider border-b border-gray-200">
                  <tr className="bg-[#f5f9fa]">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-center">Age</th>
                    <th className="p-3 text-center">Heart Rate</th>
                    <th className="p-3 text-center">Blood Pressure</th>
                    <th className="p-3 text-left">Condition</th>
                    <th className="p-3 text-center">Severity</th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-slate-100">
                  {searchedPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="text-left flex gap-2 items-center p-3">
                       <CircleUserRound />
                        {patient.name}
                      </td>
                      <td className="p-3 text-center">{patient.age}</td>
                      <td className="p-3 text-center">{patient.heartRate}</td>
                      <td className="p-3 text-center">
                        {patient.bloodPressure}
                      </td>
                      <td className="p-3 text-left">{patient.condition}</td>
                      <td>
                        <span
                          className={`text-center  px-3 py-[2px]
                                    ${patient.severity === "STABLE" && "bg-[#0a8d6b]/30 rounded-lg text-[#0a8d6b]"}
                                    ${patient.severity === "CRITICAL" && "bg-[#d84945]/30 rounded-lg text-[#d84945]"}
                                    `}
                        >
                          {patient.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
