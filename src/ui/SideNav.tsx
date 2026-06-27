import { ActivityIcon, BabyIcon, HeartIcon, Siren } from "lucide-react";
import { useClinicalStore, type HospitalWard } from "../store/useClinicalStore";
import logoImg from '../assets/logo.png';

const wards: HospitalWard[] = [
  "EMERGENCY_ROOM",
  "ICU",
  "PEDIATRICS",
  "CARDIOLOGY",
];

 const formatWardName = (name: string) => {
  return name.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
};

function SideNav() {
    const {activeWard, setActiveWard } = useClinicalStore();
   
  return (
    <aside className="max-w-lg top-0  sticky flex-flex-col">
      <div className="bg-white flex items-center gap-2 mb-1 px-6 py-4 text-start">
        <img src={logoImg} alt="" className="w-12 h-auto"/>
        <h4 className="text-2xl font-medium">Medipulse</h4>
      </div>
      <nav className="flex flex-col gap-2 h-screen bg-white p-10 text-gray-400 font-medium text-md ">
        {wards.map((ward) => (
          <div key={ward}
          onClick={() => setActiveWard(ward)}
           className={`text-start px-4 py-2 flex gap-2  ${activeWard === ward && 'border border-[#f8f8f8] text-text-1'}
          `}>

            {ward === "EMERGENCY_ROOM"? <Siren size={20} /> : null }
            {ward === "ICU" ? <ActivityIcon size={20} /> : null}
            {ward === "PEDIATRICS" ? <BabyIcon size={20} /> : null}
            {ward === "CARDIOLOGY" ? <HeartIcon size={20} /> : null}
            <button
            >
               {formatWardName(ward)}</button>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default SideNav;
